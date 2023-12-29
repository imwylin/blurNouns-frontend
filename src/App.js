import React from 'react';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import './App.css';

const App = () => {
  const [account, setAccount] = useState('');
  const [chainId, setChainId] = useState('');
  const [balance, setBalance] = useState('');

  const { activate, active, library, account: connectedAccount } = useWeb3React();

  const { Moralis, isWeb3Enabled } = useMoralis();

  useEffect(() => {
    if (isWeb3Enabled) {
      if (connectedAccount) {
        setAccount(connectedAccount);
        setChainId(parseInt(Moralis.chainId));
        library.getBalance(connectedAccount).then((balance) => {
          setBalance(ethers.utils.formatEther(balance));
        });
      } else {
        activate(injectedConnector).then(() => {
          setAccount(connectedAccount);
          setChainId(parseInt(Moralis.chainId));
          library.getBalance(connectedAccount).then((balance) => {
            setBalance(ethers.utils.formatEther(balance));
          });
        });
      }
    }
  }, [isWeb3Enabled]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Web3 Dapp Template</h1>
        <p>Connected to Ethereum with Web3</p>
        <p>
          Account: {account}
        </p>
        <p>
          Chain ID: {chainId}
        </p>
        <p>
          Balance: {balance} ETH
        </p>
      </header>
    </div>
  );
};

export default App;
