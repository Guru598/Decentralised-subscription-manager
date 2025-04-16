// src/components/SubscriptionForm.js
import React, { useState } from "react";
import { parseEther, BrowserProvider } from "ethers";
import getContract from "../utils/contract";

function SubscriptionForm({ account }) {
  const [subscriptionAmount, setSubscriptionAmount] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!window.ethereum) return alert("MetaMask not detected");

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);

    try {
      const tx = await contract.subscribe({ value: parseEther(subscriptionAmount) });
      await tx.wait();
      alert("Subscription successful!");
    } catch (err) {
      console.error(err);
      alert("Subscription failed!");
    }
  };

  return (
    <form onSubmit={handleSubscribe}>
      <input
        type="text"
        placeholder="Amount in ETH"
        value={subscriptionAmount}
        onChange={(e) => setSubscriptionAmount(e.target.value)}
      />
      <button type="submit">Subscribe</button>
    </form>
  );
}

export default SubscriptionForm;
