import React, { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
// var contract = require("@truffle/contract");

import "./App.css";

function App() {
  const [storageValue, setStorageValue] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  

  useEffect(() => {
    const initializeWeb3 = async () => {
      const startApp = (provider) => {
        if (provider !== window.ethereum) {
          console.error("Do you have multiple wallets installed?");
        }
        console.log("START DAPP, currently DAPP does nothing");
      };

      //Get network provider and web3 instance
      const provider = await detectEthereumProvider();
      if (provider) {
        console.log(provider);
        console.log("provider, metamask is detected");
        startApp(provider); // Initialize your app
      } else {
        console.log("Please install MetaMask!");
      }

      let currentAccount = null;
      window.ethereum
        .request({ method: "eth_accounts" })
        .then(handleAccountsChanged)
        .catch((err) => {
          console.error(err);
        });

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      function handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
          console.log("Please connect to MetaMask.");
        } else if (accounts[0] !== currentAccount) {
          currentAccount = accounts[0];
          const showAccount = document.querySelector(".showAccount");
          showAccount.innerHTML = currentAccount;
        }
      }
    };

    const runExample = async () => {
      const { accounts, contract } = this.state;

      // Stores a given value, 5 by default.
      await contract.methods.set(5).send({ from: accounts[0] });

      // Get the value from the contract to prove it worked.
      const response = await contract.methods.get().call();

      // Update state with the result.
      this.setState({ storageValue: response });
    };

    // runExample();
    initializeWeb3();
  });

  //declare a runExample function that is asynchronous
  // const runExample = async () => {};

  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          Creating my first FULL STACK DAPP
          <h2>
            Account: <span className="showAccount"></span>
          </h2>
        </header>
      </div>

      {/* <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div> */}
    </React.Fragment>
  );
}

export default App;
