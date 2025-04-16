// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import SubscriptionForm from "./components/SubscriptionForm";

function App() {
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
    } else {
      alert("Please install MetaMask");
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div>
      <h1>Decentralized Content Subscription</h1>
      <p>Connected Wallet: {account}</p>
      <SubscriptionForm account={account} />
    </div>
  );
}

export default App;
