import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useAccount, useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import { ENCRYPTED_ERC20_ADDRESS, EncryptedERC20Abi } from '../utils/contracts';

interface TxRow {
  type: string;
  amount: string;
  date: string;
  status: string;
}

const History: React.FC = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [history, setHistory] = useState<TxRow[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!walletClient || !address) return;
      try {
        const provider = new ethers.BrowserProvider(walletClient);
        const contract = new ethers.Contract(ENCRYPTED_ERC20_ADDRESS, EncryptedERC20Abi, provider);
        const filterDeposit = contract.filters.Deposit(address);
        const filterWithdraw = contract.filters.Withdraw(address);
        const filterTransferIn = contract.filters.PrivateTransfer(null, address);
        const filterTransferOut = contract.filters.PrivateTransfer(address, null);
        const [deposits, withdraws, transfersIn, transfersOut] = await Promise.all([
          contract.queryFilter(filterDeposit),
          contract.queryFilter(filterWithdraw),
          contract.queryFilter(filterTransferIn),
          contract.queryFilter(filterTransferOut),
        ]);
        const txs: TxRow[] = [];
        // Função auxiliar para buscar timestamp do bloco
        const getDate = async (blockNumber: number) => {
          const block = await provider.getBlock(blockNumber);
          return block ? new Date(Number(block.timestamp) * 1000).toLocaleString() : '-';
        };
        // Deposits
        for (const ev of deposits) {
          const date = await getDate(ev.blockNumber);
          let amount = '-';
          if ('args' in ev && ev.args && typeof ev.args === 'object' && 'amount' in ev.args) {
            amount = (ev.args as any).amount?.toString() || '-';
          }
          txs.push({
            type: 'Depósito',
            amount,
            date,
            status: 'Sucesso',
          });
        }
        // Withdraws
        for (const ev of withdraws) {
          const date = await getDate(ev.blockNumber);
          let amount = '-';
          if ('args' in ev && ev.args && typeof ev.args === 'object' && 'amount' in ev.args) {
            amount = (ev.args as any).amount?.toString() || '-';
          }
          txs.push({
            type: 'Saque',
            amount,
            date,
            status: 'Sucesso',
          });
        }
        // Transfers recebidas
        for (const ev of transfersIn) {
          const date = await getDate(ev.blockNumber);
          txs.push({
            type: 'Transferência recebida',
            amount: '-',
            date,
            status: 'Sucesso',
          });
        }
        // Transfers enviadas
        for (const ev of transfersOut) {
          const date = await getDate(ev.blockNumber);
          txs.push({
            type: 'Transferência enviada',
            amount: '-',
            date,
            status: 'Sucesso',
          });
        }
        txs.sort((a, b) => b.date.localeCompare(a.date));
        setHistory(txs);
      } catch (e) {
        setHistory([]);
      }
    };
    fetchHistory();
  }, [walletClient, address]);

  return (
    <Box>
      <Typography variant="h5">Histórico</Typography>
      <Typography variant="body1" mb={2}>
        Veja suas transações privadas recentes.
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">Nenhuma transação encontrada.</TableCell>
              </TableRow>
            ) : (
              history.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default History; 