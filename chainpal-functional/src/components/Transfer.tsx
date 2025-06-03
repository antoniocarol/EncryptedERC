import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useAccount, useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import { getEncryptedERC20Contract } from '../utils/contracts';

const Transfer: React.FC = () => {
  const { isConnected, address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [to, setTo] = useState('');
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
        // eGCT: { c1: {x, y}, c2: {x, y} }
        setPrivateBalance(
          `c1: (${result[0].c1.x}, ${result[0].c1.y}), c2: (${result[0].c2.x}, ${result[0].c2.y})`
        );
      } catch (e) {
        setPrivateBalance('N/A');
      }
    };
    fetchPrivateBalance();
  }, [walletClient, address]);

  const handleTransfer = async () => {
    if (!walletClient || !address) return;
    setLoading(true);
    setMessage(null);
    try {
      const provider = new ethers.BrowserProvider(walletClient);
      const signer = await provider.getSigner();
      // const encryptedERC = getEncryptedERC20Contract(signer); // Variável não utilizada removida
      // Aqui deveria gerar zk proof e chamar transfer
      // const tx = await encryptedERC.transfer(to, value, proof, ...args);
      setMessage('Transferência enviada! (mock)');
      setAmount('');
      setTo('');
    } catch (e: any) {
      setMessage('Erro: ' + (e.message || 'Falha ao transferir.'));
    }
    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h5">Transferência</Typography>
      <Typography variant="body2" mb={1} color="text.secondary">
        Saldo privado (criptografado): <b>{privateBalance}</b>
      </Typography>
      <TextField
        label="Destinatário"
        value={to}
        onChange={e => setTo(e.target.value)}
        fullWidth
        margin="normal"
        disabled={!isConnected || loading}
      />
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
        onClick={handleTransfer}
        disabled={!isConnected || loading || !amount || !to}
        fullWidth
      >
        {loading ? 'Transferindo...' : 'Transferir'}
      </Button>
      {message && (
        <Typography color={message.startsWith('Erro') ? 'error' : 'primary'} mt={2}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default Transfer; 