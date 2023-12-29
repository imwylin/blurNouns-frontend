// web3.js
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const App = () => {
  const [account, setAccount] = useState('');

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);
        } catch (error) {
          console.error('Error connecting to Ethereum:', error);
        }
      } else {
        console.error('No Ethereum provider detected.');
      }
    };
    initWeb3();
  }, []);

  return (
    <div>
      <h1>Ethereum Account:</h1>
      <p>{account}</p>
    </div>
  );
};

export default App;
