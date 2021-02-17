import detectEthereumProvider from "@metamask/detect-provider";

const initializeWeb3 = async () => {
  const startApp = (provider) => {
    // If the provider returned by detectEthereumProvider is not the same as
    // window.ethereum, something is overwriting it, perhaps another wallet.
    if (provider !== window.ethereum) {
      console.error("Do you have multiple wallets installed?");
    }
    // Access the decentralized web!
    console.log("START DAPP, currently DAPP does nothing")
  };

  /*****************************************/
  /* Detect the MetaMask Ethereum provider */
  /*****************************************/

  //Get network provider and web3 instance
  const provider = await detectEthereumProvider();
  if (provider) {
    console.log(provider);
    console.log("provider, metamask is detected");
    startApp(provider); // Initialize your app
  } else {
    console.log("Please install MetaMask!");
  }

  /**********************************************************/
  /* Handle chain (network) and chainChanged (per EIP-1193) */
  /**********************************************************/

  // const chainId = await window.ethereum.request({ method: "eth_chainId" });
  // handleChainChanged(chainId);

  // window.ethereum.on("chainChanged", handleChainChanged);

  // function handleChainChanged(_chainId) {
  //   // We recommend reloading the page, unless you must do otherwise
  //   window.location.reload();
  // }

  /***********************************************************/
  /* Handle user accounts and accountsChanged (per EIP-1193) */
  /***********************************************************/

  let currentAccount = null;
  window.ethereum
    .request({ method: "eth_accounts" })
    .then(handleAccountsChanged)
    .catch((err) => {
      // Some unexpected error.
      // For backwards compatibility reasons, if no accounts are available,
      // eth_accounts will return an empty array.
      console.error(err);
    });

  // Note that this event is emitted on page load.
  // If the array of accounts is non-empty, you're already
  // connected.
  window.ethereum.on("accountsChanged", handleAccountsChanged);

  // For now, 'eth_accounts' will continue to always return an array
  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.");
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
      // Do any other work!
      //display current connected account
      const showAccount = document.querySelector('.showAccount');
      showAccount.innerHTML = currentAccount;
    }
  }

  /*********************************************/
  /* Access the user's accounts (per EIP-1102) */
  /*********************************************/

  // You should only attempt to request the user's accounts in response to user
  // interaction, such as a button click.
  // Otherwise, you popup-spam the user like it's 1999.
  // If you fail to retrieve the user's account(s), you should encourage the user
  // to initiate the attempt.
  const ethereumButton = document.getElementById("connectButton");

  ethereumButton.addEventListener('click', () => {
    connect();
  })

  // While you are awaiting the call to eth_requestAccounts, you should disable
  // any buttons the user can click to initiate the request.
  // MetaMask will reject any additional requests while the first is still
  // pending.
  function connect() {
    console.log("The button is detected and account is connected")
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
  }
  //get contract instance
  //set web3, accounts, and contract to the state, and then proceed with an
  //example of interacting with the contract's methods
};

export default initializeWeb3;
