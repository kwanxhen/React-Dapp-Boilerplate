import React, { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import SimpleStorageContract from "./contracts/SimpleStorage.json";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [storageValue, setStorageValue] = useState(0);

  //Initializing web3 object
  let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  useEffect(() => {
    initializeWeb3();
    //does not work if i let runExample() run
    // runExample();
  }, []);

  const initializeWeb3 = async () => {
    //get account
    // const accounts = await ethereum.request({ method: 'eth_accounts' });
    // console.log('this is the metamask account' + accounts);
    web3.eth.getAccounts().then((props) => {
      console.log(props);
      setCurrentAccount(props[0]);
      console.log("the first metamask account is " + currentAccount);
    });

    //get network
    const networkType = await web3.eth.net.getNetworkType();
    console.log("network type is " + networkType);

    //init contract
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = SimpleStorageContract.networks[networkId];
    const instance = new web3.eth.Contract(
      SimpleStorageContract.abi,
      deployedNetwork && deployedNetwork.address
    );
    setContract(instance);
  };

  const runExample = async () => {
    await contract.methods.set(5).send({ from: currentAccount });
    setStorageValue(await contract.methods.get().call());
    console.log("this is the storageValue " + storageValue);
  };

  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          Creating my first FULL STACK DAPP
          <h2>
            Account: <span className="showAccount">{currentAccount}</span>
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
