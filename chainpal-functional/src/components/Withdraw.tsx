import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useAccount, useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import { getEncryptedERC20Contract } from '../utils/contracts';

const Withdraw: React.FC = () => {
  const { isConnected, address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [privateBalance, setPrivateBalance] = useState<string>('***');

  // Buscar saldo privado bruto (criptografado)
  useEffect(() => {
    const fetchPrivateBalance = async () => {
      if (!walletClient || !address) return;
      try {
        const provider = new ethers.BrowserProvider(walletClient);
        const encryptedERC = getEncryptedERC20Contract(provider);
        const result = await encryptedERC.balanceOfStandalone(address);
        setPrivateBalance(
          `c1: (${result[0].c1.x}, ${result[0].c1.y}), c2: (${result[0].c2.x}, ${result[0].c2.y})`
        );
      } catch (e) {
        setPrivateBalance('N/A');
      }
    };
    fetchPrivateBalance();
  }, [walletClient, address]);

  const handleWithdraw = async () => {
    if (!walletClient || !address) return;
    setLoading(true);
    setMessage(null);
    try {
      const provider = new ethers.BrowserProvider(walletClient);
      // const signer = await provider.getSigner(); // signer não é usado se encryptedERC for removido
      // const encryptedERC = getEncryptedERC20Contract(signer); // Variável não utilizada removida
      // Aqui deveria gerar zk proof e chamar withdraw
      // const tx = await encryptedERC.withdraw(value, proof, ...args);
      setMessage('Saque enviado! (mock)');
      setAmount('');
    } catch (e: any) {
      setMessage('Erro: ' + (e.message || 'Falha ao sacar.'));
    }
    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h5">Saque</Typography>
      <Typography variant="body2" mb={1} color="text.secondary">
        Saldo privado (criptografado): <b>{privateBalance}</b>
      </Typography>
      <TextField
        label="Valor"
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        fullWidth
        margin="normal"
        disabled={!isConnected || loading}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleWithdraw}
        disabled={!isConnected || loading || !amount}
        fullWidth
      >
        {loading ? 'Sacando...' : 'Sacar'}
      </Button>
      {message && (
        <Typography color={message.startsWith('Erro') ? 'error' : 'primary'} mt={2}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default Withdraw; 