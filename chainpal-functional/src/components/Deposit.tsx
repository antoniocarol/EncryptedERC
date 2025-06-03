import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { useAccount, useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import { useQueryClient } from '@tanstack/react-query';
import {
  getERC20Contract,
  getEncryptedERC20Contract,
  getRegistrarContract,
  ERC20_ADDRESS,
  REGISTRAR_ADDRESS,
} from '../utils/contracts';
import { EncryptedERC__factory } from '../typechain-types/factories/contracts/EncryptedERC__factory';
import { Registrar__factory } from '../typechain-types/factories/contracts/Registrar__factory';

import { Base8, mulPointEscalar, type Point } from '@zk-kit/baby-jubjub';
import { genRandomBabyJubValue, formatPrivKeyForBabyJub, poseidonEncrypt } from 'maci-crypto';
import { poseidon3 as poseidon } from 'poseidon-lite';
import * as snarkjs from 'snarkjs';

/* ------------------------------------------------------------------ */
/*                     constantes de configuração                     */
/* ------------------------------------------------------------------ */
const LOCAL_CHAIN_ID = 31337;
const LOCAL_CHAIN_NAME = 'Localhost 8545';

const CIRCUIT_CONFIG = {
  wasmPath: '/circuits/RegistrationCircuit.wasm',
  zkeyPath: '/circuits/RegistrationCircuit.groth16.zkey',
} as const;

const ERROR_CODES = {
  INVALID_PROOF: '0x09bde339',
  USER_ALREADY_REGISTERED: '0x71a3b97d',
} as const;

// SNARK field prime for BN128 curve
const SNARK_FIELD = BigInt('21888242871839275222246405745257275088548364400416034343698204186575808495617');

// Adicionar BASE_POINT_ORDER (copiado de src/constants.ts do projeto EncryptedERC, ajustar se necessário)
const BASE_POINT_ORDER = BigInt('2736030358979909402780800718157159386076813972158567259200215660948447373041');

/* ------------------------------------------------------------------ */
/*                               tipos                                */
/* ------------------------------------------------------------------ */
interface ProofPoints {
  a: [string, string];
  b: [[string, string], [string, string]];
  c: [string, string];
}
interface ProofForContract {
  proofPoints: ProofPoints;
  publicSignals: string[];
}

/* ------------------------------------------------------------------ */
/*                            helpers ZK                              */
/* ------------------------------------------------------------------ */
const formatProofForSolidity = (p: any): ProofPoints => ({
  a: [ethers.toBeHex(p.pi_a[0], 32), ethers.toBeHex(p.pi_a[1], 32)],
  b: [
    [ethers.toBeHex(p.pi_b[0][1], 32), ethers.toBeHex(p.pi_b[0][0], 32)],
    [ethers.toBeHex(p.pi_b[1][1], 32), ethers.toBeHex(p.pi_b[1][0], 32)],
  ],
  c: [ethers.toBeHex(p.pi_c[0], 32), ethers.toBeHex(p.pi_c[1], 32)],
});

// Fixed address formatting - ensure it stays within field bounds
const formatAddressForCircuit = (addr: string): string => {
  try {
    const normalizedAddr = ethers.getAddress(addr);
    let bigIntAddr = BigInt(normalizedAddr);
    
    // Ensure the address is within the SNARK field
    if (bigIntAddr >= SNARK_FIELD) {
      // Use modular reduction to bring it within bounds
      bigIntAddr = bigIntAddr % SNARK_FIELD;
      console.warn(`Address reduced from ${BigInt(normalizedAddr)} to ${bigIntAddr}`);
    }
    
    const result = bigIntAddr.toString();
    console.log(`Address ${addr} -> ${result}`);
    return result;
  } catch (error) {
    console.error('Erro formatando endereço:', error);
    throw new Error(`Endereço inválido: ${addr}`);
  }
};

// More deterministic registration hash generation
const generateRegistrationHash = (
  address: string,
  senderPrivKey: bigint,
  chainId: number,
): string => {
  try {
    const addressBigInt = BigInt(formatAddressForCircuit(address));

    // Inputs para o Poseidon, na mesma ordem do circuito
    const input1 = BigInt(ensureFieldBounds(BigInt(chainId)));
    const input2 = BigInt(ensureFieldBounds(senderPrivKey));
    const input3 = BigInt(ensureFieldBounds(addressBigInt));
    
    // Use poseidon2 com 3 inputs
    const hash = poseidon([input1, input2, input3]);
    const result = ensureFieldBounds(hash);
    
    console.log(`Circom-compatible hash for ${address} (using 3 inputs): ${result}`);
    console.log(`Inputs used: [${input1}, ${input2}, ${input3}] (ChainID, PrivKey, Address)`);
    
    return result;
  } catch (error) {
    console.error('Erro no hash circom-compatible (3 inputs):', error);
    throw error;
  }
};

const ensureFieldBounds = (v: string | bigint): string => {
  try {
    const x = typeof v === 'string' ? BigInt(v) : v;
    if (x < BigInt(0)) {
      throw new Error(`Valor negativo não permitido: ${x}`);
    }
    const result = x % SNARK_FIELD;
    if (result !== x) {
      console.warn(`Valor ajustado de ${x} para ${result}`);
    }
    return result.toString();
  } catch (error) {
    console.error('Erro garantindo limites do campo:', error);
    throw error;
  }
};

// Improved Baby Jubjub validation
const validatePublicKey = (pubKey: [string, string]): boolean => {
  try {
    const x = BigInt(pubKey[0]);
    const y = BigInt(pubKey[1]);
    
    // Verify field bounds
    if (x >= SNARK_FIELD || y >= SNARK_FIELD) {
      throw new Error('Chave pública fora dos limites do campo');
    }
    
    // Baby Jubjub curve equation: ax² + y² = 1 + dx²y²
    // Constants for Baby Jubjub: a = 168700, d = 168696
    const a = BigInt('168700');
    const d = BigInt('168696');
    const p = SNARK_FIELD;
    
    // Calculate curve equation components
    const x2 = (x * x) % p;
    const y2 = (y * y) % p;
    const ax2 = (a * x2) % p;
    const dx2y2 = (d * x2 % p * y2) % p;
    
    const leftSide = (ax2 + y2) % p;
    const rightSide = (BigInt(1) + dx2y2) % p;
    
    if (leftSide !== rightSide) {
      throw new Error(`Chave pública não está na curva Baby Jubjub. Left: ${leftSide}, Right: ${rightSide}`);
    }
    
    console.log('✅ Chave pública válida na curva');
    return true;
  } catch (error) {
    console.error('❌ Validação da chave pública falhou:', error);
    throw error;
  }
};

// Nova função para gerar nonce no frontend
const randomNonceFrontend = (): bigint => {
  const bytes = ethers.randomBytes(16); // Usar ethers.js para random bytes no frontend
  return BigInt(`0x${ethers.hexlify(bytes).substring(2)}`) + BigInt(1); // Converter para BigInt
};

// Lógica de processPoseidonEncryption adaptada para o frontend
const processPoseidonEncryptionFrontend = (
	inputs: bigint[],
	publicKeyStrings: [string, string], // Aceita strings como no estado do componente
): { ciphertext: bigint[]; nonce: bigint; authKey: [bigint, bigint] } => {
	const nonce = randomNonceFrontend();
	let encRandom = genRandomBabyJubValue(); // maci-crypto
	// Assegurar que encRandom está dentro da ordem do ponto base (similar à lógica original)
	if (encRandom >= BASE_POINT_ORDER) {
		encRandom = BigInt(encRandom.toString()) / BigInt(10); // Ajustar para BigInt se necessário
    if (encRandom >= BASE_POINT_ORDER) { // Checagem dupla caso a divisão ainda seja grande
        encRandom = encRandom % BASE_POINT_ORDER;
    }
    if (encRandom === BigInt(0)) encRandom = BigInt(1); // Evitar random 0
	}

  const publicKeyBigInts: [bigint, bigint] = [BigInt(publicKeyStrings[0]), BigInt(publicKeyStrings[1])];

	const poseidonEncryptionKeyPoint = mulPointEscalar(
		publicKeyBigInts as Point<bigint>, // baby-jubjub
		encRandom,
	);
	const poseidonEncryptionKey: [bigint, bigint] = [poseidonEncryptionKeyPoint[0], poseidonEncryptionKeyPoint[1]];
	
  const authKey = mulPointEscalar(Base8, encRandom) as [bigint, bigint]; // baby-jubjub
	
  const ciphertext = poseidonEncrypt(inputs, poseidonEncryptionKey, nonce); // maci-crypto

	return { ciphertext, nonce, authKey };
};

const generateAmountPCTForDeposit = (
  valueToEncrypt: bigint,
  userPublicKey: [string, string] // Chave pública do usuário [string, string]
): [string, string, string, string, string, string, string] => {
  if (!userPublicKey || !userPublicKey[0] || !userPublicKey[1]) {
    throw new Error('generateAmountPCTForDeposit: Chave pública do usuário inválida ou não fornecida.');
  }

  const { ciphertext, nonce, authKey } = processPoseidonEncryptionFrontend(
    [valueToEncrypt], // O valor a ser criptografado como um array de bigint
    userPublicKey
  );

  // poseidonEncrypt de maci-crypto retorna bigint[4] para ciphertext (c1x,c1y,c2x,c2y)
  if (!ciphertext || ciphertext.length !== 4) {
    console.error("processPoseidonEncryptionFrontend: ciphertext inválido ou com tamanho incorreto", ciphertext);
    throw new Error("Falha ao gerar o ciphertext para amountPCT. Esperava 4 elementos.");
  }
  if (!authKey || authKey.length !== 2) {
    console.error("processPoseidonEncryptionFrontend: authKey inválida ou com tamanho incorreto", authKey);
    throw new Error("Falha ao gerar o authKey para amountPCT. Esperava 2 elementos.");
  }

  return [
    ciphertext[0].toString(), // c1x
    ciphertext[1].toString(), // c1y
    ciphertext[2].toString(), // c2x
    ciphertext[3].toString(), // c2y
    authKey[0].toString(),    // ax
    authKey[1].toString(),    // ay
    nonce.toString(),
  ];
};

/* ------------------------------------------------------------------ */
/*                           componente                               */
/* ------------------------------------------------------------------ */
const Deposit: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const queryClient = useQueryClient();

  /* --------------------- estado principal --------------------- */
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  /* ambiente */
  const [networkOk, setNetworkOk] = useState(true);
  const [contractOk, setContractOk] = useState(true);
  const [registrarOk, setRegistrarOk] = useState(true);
  const [networkName, setNetworkName] = useState('');
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [balance, setBalance] = useState('0');

  /* ZK keys */
  const [privKey, setPrivKey] = useState<bigint | null>(null);
  const [pubKey, setPubKey] = useState<[string, string] | null>(null);
  const [keysGenerated, setKeysGenerated] = useState(false);

  /* --------------------- derivações --------------------- */
  const canOperate = useMemo(
    () => isConnected && networkOk && contractOk && registrarOk,
    [isConnected, networkOk, contractOk, registrarOk],
  );

  const canDeposit = useMemo(
    () =>
      canOperate &&
      isUserRegistered &&
      !loading &&
      !registrationLoading &&
      amount && parseFloat(amount) > 0,
    [canOperate, isUserRegistered, loading, registrationLoading, amount],
  );

  /* --------------------- geração de chaves melhorada --------------------- */
  const generateKeys = useCallback(() => {
    if (keysGenerated || !isConnected || !address) return;
    try {
      console.log('Gerando chaves criptográficas...');
      
      const rawPrivKey = genRandomBabyJubValue();
      const formattedPrivKey = formatPrivKeyForBabyJub(rawPrivKey);
      
      const privateKeyBigInt = BigInt(formattedPrivKey.toString()) % SNARK_FIELD;
      
      const point = mulPointEscalar(Base8, privateKeyBigInt);
      
      const publicKeyX = ensureFieldBounds(point[0].toString());
      const publicKeyY = ensureFieldBounds(point[1].toString());
      
      const newPubKey: [string, string] = [publicKeyX, publicKeyY];
      
      validatePublicKey(newPubKey);
      
      setPrivKey(privateKeyBigInt);
      setPubKey(newPubKey);
      setKeysGenerated(true);
      
      console.log('✅ Chaves geradas e validadas com sucesso');
      console.log('Private Key:', privateKeyBigInt.toString());
      console.log('Public Key:', newPubKey);
      
    } catch (e) {
      console.error('Erro gerando chaves:', e);
      setMessage('Erro gerando chaves: ' + (e as Error).message);
    }
  }, [keysGenerated, isConnected, address]);

  useEffect(() => {
    if (isConnected && address && !keysGenerated) generateKeys();
  }, [isConnected, address, keysGenerated, generateKeys]);

  /* --------------------- saldo ERC-20 --------------------- */
  const fetchBalance = useCallback(async () => {
    if (!walletClient || !address) return;
    try {
      const provider = new ethers.BrowserProvider(walletClient.transport);
      const erc20 = getERC20Contract(provider);
      const bal = await erc20.balanceOf(address);
      setBalance(ethers.formatUnits(bal, await erc20.decimals()));
    } catch (e) {
      console.error('Erro buscando saldo ERC20:', e);
      setBalance('0');
    }
  }, [walletClient, address]);

  /* --------------------- verificação de ambiente --------------------- */
  const checkEnv = useCallback(async () => {
    setNetworkOk(true);
    setContractOk(true);
    setRegistrarOk(true);
    setIsUserRegistered(false);
    setNetworkName('');
    if (!walletClient || !address) return;

    try {
      const provider = new ethers.BrowserProvider(walletClient.transport);
      const net = await provider.getNetwork();
      setNetworkName(net.name || net.chainId.toString());
      if (Number(net.chainId) !== LOCAL_CHAIN_ID) {
        setNetworkOk(false);
        return;
      }

      try {
        await getERC20Contract(provider).name();
      } catch(e) {
        console.error("Falha ao verificar contrato ERC20:", e);
        setContractOk(false);
        return;
      }

      try {
        const reg = getRegistrarContract(provider);
        setIsUserRegistered(await reg.isUserRegistered(address));
      } catch (e) {
        console.error("Falha ao verificar contrato Registrar:", e);
        setRegistrarOk(false);
      }
    } catch (e) {
      console.error('Erro verificando ambiente:', e);
      setNetworkOk(false);
      setContractOk(false);
      setRegistrarOk(false);
    }
  }, [walletClient, address]);

  useEffect(() => {
    checkEnv();
    if (isConnected && address) fetchBalance();
  }, [walletClient, address, isConnected, checkEnv, fetchBalance]);

  // Enhanced circuit input debugging
  const debugCircuitInputs = (inputs: any) => {
    console.log('=== DEBUG CIRCUIT INPUTS ===');
    console.log('SenderPrivateKey:', inputs.SenderPrivateKey);
    console.log('SenderPublicKey:', inputs.SenderPublicKey);
    console.log('SenderAddress:', inputs.SenderAddress);
    console.log('ChainID:', inputs.ChainID);
    console.log('RegistrationHash:', inputs.RegistrationHash);
    
    Object.entries(inputs).forEach(([key, value]: [string, any]) => {
      if (Array.isArray(value)) {
        value.forEach((v, idx) => {
          try {
            const bigIntValue = BigInt(v);
            const isValid = bigIntValue < SNARK_FIELD && bigIntValue >= BigInt(0);
            console.log(`${key}[${idx}]: ${v} (valid: ${isValid})`);
            if (!isValid) {
              console.error(`❌ ${key}[${idx}] inválido: ${v} (field: ${SNARK_FIELD})`);
            }
          } catch (e) {
            console.error(`❌ Erro ao converter ${key}[${idx}] para BigInt: ${v}`, e);
          }
        });
      } else {
        try {
          const bigIntValue = BigInt(value as any); // type assertion
          const isValid = bigIntValue < SNARK_FIELD && bigIntValue >= BigInt(0);
          console.log(`${key}: ${value} (valid: ${isValid})`);
          if (!isValid) {
            console.error(`❌ ${key} inválido: ${value} (field: ${SNARK_FIELD})`);
          }
        } catch (e) {
          console.error(`❌ Erro ao converter ${key} para BigInt: ${value}`, e);
        }
      }
    });
    console.log('=== END DEBUG ===');
  };

  /* --------------------- registro melhorado --------------------- */
  const handleRegister = useCallback(async () => {
    if (!walletClient || !address) {
      setMessage('Wallet não conectada.');
      return;
    }
    if (!privKey || !pubKey) {
      setMessage('Chaves não geradas. Tente gerar novamente ou recarregue a página.');
      return;
    }
  
    setRegistrationLoading(true);
    setMessage('Gerando prova de registro...');
  
    try {
      const provider = new ethers.BrowserProvider(walletClient.transport);
      const signer = await provider.getSigner();
      const registrarContract = getRegistrarContract(signer);
      const network = await provider.getNetwork();
      const currentChainId = network.chainId;
      
      validatePublicKey(pubKey);
      
      const regHash = generateRegistrationHash(address, privKey, Number(currentChainId));
  
      const inputs = {
        SenderPrivateKey: ensureFieldBounds(privKey),
        SenderPublicKey: [ensureFieldBounds(pubKey[0]), ensureFieldBounds(pubKey[1])],
        SenderAddress: formatAddressForCircuit(address),
        ChainID: ensureFieldBounds(currentChainId.toString()),
        RegistrationHash: ensureFieldBounds(regHash),
      };
  
      debugCircuitInputs(inputs);
      
      const expectedPoint = mulPointEscalar(Base8, BigInt(inputs.SenderPrivateKey));
      const expectedPubKey: [string, string] = [
        ensureFieldBounds(expectedPoint[0].toString()),
        ensureFieldBounds(expectedPoint[1].toString())
      ];
      
      if (expectedPubKey[0] !== inputs.SenderPublicKey[0] || 
          expectedPubKey[1] !== inputs.SenderPublicKey[1]) {
        throw new Error('Inconsistência entre chave privada e pública gerada para o circuito.');
      }
      
      console.log('✅ Validação de consistência das chaves aprovada para registro.');
      console.log('Gerando prova de registro com inputs validados...');
      
      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        inputs,
        CIRCUIT_CONFIG.wasmPath,
        CIRCUIT_CONFIG.zkeyPath,
      );
  
      console.log('✅ Prova de registro gerada:', proof);
      console.log('Sinais públicos do registro:', publicSignals);
  
      const formattedProof = formatProofForSolidity(proof);
      const formattedSignals = publicSignals.map((s: string) => ethers.toBeHex(BigInt(s), 32));
  
      console.log('Enviando transação de registro...');
      const tx = await registrarContract.register({
        proofPoints: formattedProof,
        publicSignals: formattedSignals,
      });
  
      setMessage(`Transação de registro enviada: ${tx.hash}. Aguardando confirmação...`);
      await tx.wait();
      setMessage(`Usuário registrado com sucesso! Tx: ${tx.hash}`);
      setIsUserRegistered(true);
    } catch (err: any) {
      console.error('Erro completo no registro:', err);
      let errorMessage = 'Falha no registro: ';
      if (err.message?.includes('Assert Failed')) {
        errorMessage += 'Constraints do circuito não satisfeitas.';
      } else if (err.message?.includes('field') || err.message?.includes('bounds')) {
        errorMessage += 'Valor fora dos limites do campo.';
      } else if (err.message?.includes('curva')) {
        errorMessage += 'Chave pública inválida.';
      } else if (err.data && typeof err.data === 'string' && err.data !== '0x') {
        const iface = new ethers.Interface(Registrar__factory.abi);
        try {
            const parsedError = iface.parseError(err.data);
            if (parsedError) {
                errorMessage += `(${parsedError.name}${parsedError.args.length ? ': ' + parsedError.args.join(', ') : ''})`;
            }
        } catch (e) { /* Ignorar falha na decodificação */ }
      } else {
        errorMessage += err?.reason || err?.message || 'erro desconhecido';
      }
      setMessage(errorMessage);
    } finally {
      setRegistrationLoading(false);
    }
  }, [walletClient, address, privKey, pubKey, generateKeys]);

  const handleDeposit = useCallback(async () => {
    if (!walletClient || !address || !isUserRegistered || !pubKey) {
      setMessage('Usuário não registrado, carteira desconectada ou chaves ZK não geradas. Por favor, registre-se e gere as chaves antes de depositar.');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setMessage('Por favor, insira um valor positivo para depositar.');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const provider = new ethers.BrowserProvider(walletClient.transport);
      const signer = await provider.getSigner();
      const erc20Contract = getERC20Contract(signer);
      const encryptedERC20Contract = getEncryptedERC20Contract(signer);
      
      const tokenOriginalDecimals = await erc20Contract.decimals();
      const depositValue = ethers.parseUnits(amount, Number(tokenOriginalDecimals));

      const userBalance = await erc20Contract.balanceOf(address);
      if (userBalance < depositValue) {
        setMessage('Erro: Saldo ERC20 insuficiente.');
        setLoading(false);
        return;
      }

      const allowance = await erc20Contract.allowance(address, encryptedERC20Contract.target);
      if (allowance < depositValue) {
        setMessage('Aguardando aprovação do contrato para gastar seus tokens...');
        const approveTx = await erc20Contract.approve(encryptedERC20Contract.target, depositValue);
        console.log('Approve tx:', approveTx.hash);
        await approveTx.wait();
        setMessage('Aprovação confirmada. Preparando depósito...');
      }

      const eERCDecimals = await encryptedERC20Contract.decimals();
      let valueToEncryptForPCT: bigint;
      const decimalsDiff = Number(tokenOriginalDecimals) - Number(eERCDecimals);

      if (decimalsDiff > 0) {
        // originalDecimals > eERCDecimals (ex: 18 e 2). Contrato divide por 10^(18-2).
        const scalingFactor = BigInt(10) ** BigInt(decimalsDiff);
        valueToEncryptForPCT = depositValue / scalingFactor;
      } else if (decimalsDiff < 0) {
        // originalDecimals < eERCDecimals (ex: 6 e 18). Contrato divide por 10^(6-18).
        // (6-18) = -12. Em uint256, isso é um número positivo enorme (P_FIELD - 12).
        // 10 elevado a esse número enorme provavelmente estoura ou resulta em 0 na prática dentro do EVM para a exponenciação,
        // ou o divisor se torna tão grande que o resultado da divisão é 0.
        // Para corresponder a isso, o frontend deve calcular um valor que resultará em 0 ou um valor muito pequeno.
        // A maneira mais segura de espelhar o resultado provável do contrato (0) é definir como 0.
        console.warn(`originalDecimals (${tokenOriginalDecimals}) < eERCDecimals (${eERCDecimals}). ` +
                     `O contrato EncryptedERC.sol provavelmente calculará um scaledAmount de 0 devido à sua fórmula de escalonamento. ` +
                     `valueToEncryptForPCT será definido como 0 para consistência.`);
        valueToEncryptForPCT = BigInt(0);
      } else {
        // originalDecimals == eERCDecimals. Contrato divide por 10^0 = 1.
        valueToEncryptForPCT = depositValue; // scaledAmount será depositValue (ou receivedAmount)
      }
      
      console.log(`Valor original (depositValue): ${depositValue.toString()} (${tokenOriginalDecimals} decimais)`);
      console.log(`Decimais eERC: ${eERCDecimals}`);
      console.log(`Valor a ser CRIPTOGRAFADO para amountPCT (escalonado para ${eERCDecimals} decimais eERC):`, valueToEncryptForPCT.toString());

      const amountPCTArray = generateAmountPCTForDeposit(valueToEncryptForPCT, pubKey!);
      console.log('Generated amountPCT for deposit:', amountPCTArray);

      setMessage('Enviando transação de depósito...');
      const depositTx = await encryptedERC20Contract.deposit(depositValue, await erc20Contract.getAddress(), amountPCTArray);
      console.log('Deposit tx:', depositTx.hash);
      
      setMessage(`Depósito enviado! Aguardando confirmação... Tx: ${depositTx.hash}`);
      await depositTx.wait();
      setMessage(`Depósito completado com sucesso! Tx: ${depositTx.hash}`);
      setAmount('');
      fetchBalance();
      queryClient.invalidateQueries({ queryKey: ['erc20Balance', address] });
      queryClient.invalidateQueries({ queryKey: ['encryptedEvents'] });
      queryClient.invalidateQueries({ queryKey: ['encryptedBalance', address] });

    } catch (error: any) {
      console.error('Erro no depósito:', error);
      let decodedErrorMsg = '';
      if (error.data && typeof error.data === 'string' && error.data !== '0x') {
        const iface = new ethers.Interface(EncryptedERC__factory.abi);
        try {
            const parsedError = iface.parseError(error.data);
            if (parsedError) {
                decodedErrorMsg = ` (${parsedError.name}${parsedError.args.length ? ': ' + parsedError.args.join(', ') : ''})`;
            }
        } catch (e) {
            console.warn('Não foi possível decodificar o erro customizado do EncryptedERC:', e);
        }
      }
      const reason = error?.reason || error?.message || 'Falha ao depositar.';
      setMessage(`Erro: ${reason}${decodedErrorMsg}`);
    } finally {
      setLoading(false);
    }
  }, [walletClient, address, isUserRegistered, amount, fetchBalance, queryClient, pubKey, privKey]);

  // Faucet handler (unchanged, mas corrigindo decimais no fetchBalance e msg)
  const handleFaucet = useCallback(async () => {
    if (!walletClient || !address) return;

    setLoading(true);
    setMessage(null);

    try {
      const provider = new ethers.BrowserProvider(walletClient.transport);
      const signer = await provider.getSigner();
      const erc20 = getERC20Contract(signer);
      
      const tx = await erc20.mint(address, ethers.parseUnits('1000', 18));
      setMessage('Minting 1000 SimpleERC20...');
      console.log('Faucet tx:', tx.hash);
      
      await tx.wait();
      setMessage(`Faucet: 1000 SimpleERC20 minted successfully!
Tx: ${tx.hash}`);
      
      fetchBalance();
      queryClient.invalidateQueries({ queryKey: ['erc20Balance', address] });
      
    } catch (error: any) {
      console.error('Faucet error:', error);
      const reason = error?.data?.message || error?.error?.reason || error?.reason || error?.message || 'Failed to mint.';
      setMessage('Faucet error: ' + reason);
    } finally {
      setLoading(false);
    }
  }, [walletClient, address, fetchBalance, queryClient]);

  return (
    <Box>
      {/* Network Error Alert */}
      {!networkOk && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Incorrect network!<br />
          Please connect your wallet to <b>{LOCAL_CHAIN_NAME}</b> (chainId {LOCAL_CHAIN_ID}) in Metamask.<br />
          <small>Current network: {networkName || 'unknown'}</small>
        </Alert>
      )}

      {/* ERC20 Contract Error Alert */}
      {networkOk && !contractOk && (
        <Alert severity="error" sx={{ mb: 2 }}>
          ERC20 contract not found at configured address.<br />
          Please verify that you have deployed the contracts and updated the addresses in the frontend.<br />
          <small>Current address: {ERC20_ADDRESS}</small>
        </Alert>
      )}

      {/* Registrar Contract Error Alert */}
      {networkOk && contractOk && !registrarOk && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Registrar contract not found at configured address.<br />
          Please verify that you have deployed the contracts and updated the addresses in the frontend.<br />
          <small>Registrar address: {REGISTRAR_ADDRESS}</small>
        </Alert>
      )}

      {/* Registration Required Alert */}
      {canOperate && !isUserRegistered && isConnected && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          User not registered. Please register to be able to deposit.
          {!keysGenerated && (
            <Button size="small" onClick={generateKeys} sx={{ ml: 1 }}>
              Generate Registration Keys
            </Button>
          )}
        </Alert>
      )}

      <Typography variant="h5">Deposit</Typography>
      <Typography variant="body2" mb={1} color="text.secondary">
        Available ERC20 balance: <b>{balance}</b>
      </Typography>

      {/* Registration Button */}
      {canOperate && !isUserRegistered && isConnected && (
        <Button
          variant="contained"
          color="info"
          onClick={handleRegister}
          disabled={registrationLoading || !keysGenerated}
          sx={{ mb: 2 }}
          fullWidth
          startIcon={registrationLoading && <CircularProgress size={20} />}
        >
          {registrationLoading ? 'Registering...' : 'Register User'}
        </Button>
      )}

      {/* Faucet Button */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleFaucet}
        disabled={!canOperate || loading || registrationLoading}
        sx={{ mb: 2 }}
        fullWidth
        startIcon={loading && <CircularProgress size={20} />}
      >
        {loading || registrationLoading ? 'Please wait...' : 'Faucet: Mint 1000 SimpleERC20'}
      </Button>

      {/* Amount Input */}
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        margin="normal"
        disabled={!canOperate || loading || registrationLoading || !isUserRegistered}
        inputProps={{ min: 0, step: 0.01 }}
      />

      {/* Deposit Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleDeposit}
        disabled={!canDeposit}
        fullWidth
        startIcon={loading && <CircularProgress size={20} />}
      >
        {loading ? 'Depositing...' : (registrationLoading ? 'Wait for registration...' : 'Deposit')}
      </Button>

      {/* Message Display */}
      {message && (
        <Alert 
          severity={message.startsWith('Error') || message.includes('error') ? 'error' : 'info'} 
          sx={{ mt: 2 }}
        >
          {message.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </Alert>
      )}
    </Box>
  );
};

export default Deposit;