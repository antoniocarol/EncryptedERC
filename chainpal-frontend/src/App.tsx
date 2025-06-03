import React, { useState } from 'react';
import { CssBaseline, AppBar, Toolbar, Typography, Container, Box, Tab, Tabs } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { WalletConnect } from './components/WalletConnect';
import Deposit from './components/Deposit';
import Transfer from './components/Transfer';
import Withdraw from './components/Withdraw';
import History from './components/History';

function a11yProps(index: number) {
  return {
    id: `chainpal-tab-${index}`,
    'aria-controls': `chainpal-tabpanel-${index}`,
  };
}

const App: React.FC = () => {
  const [tab, setTab] = useState(0);
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => setTab(newValue);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <AccountBalanceWalletIcon sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ChainPal – Paypal Privado na Web3
          </Typography>
          <WalletConnect />
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Depósito" {...a11yProps(0)} />
          <Tab label="Transferência" {...a11yProps(1)} />
          <Tab label="Saque" {...a11yProps(2)} />
          <Tab label="Histórico" {...a11yProps(3)} />
        </Tabs>
        <Box sx={{ mt: 4 }}>
          {tab === 0 && <Deposit />}
          {tab === 1 && <Transfer />}
          {tab === 2 && <Withdraw />}
          {tab === 3 && <History />}
        </Box>
      </Container>
    </Box>
  );
};

export default App;
