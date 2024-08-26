// src/App.js
import React, { useState } from "react";
import { getProviderAndSigner } from "./utils/contractConfig";
import ConnectWalletButton from "./components/ConnectWalletButton";
import BetForm from "./components/BetForm";
import "./App.css";


function App() {
  
  const [walletConnected, setWalletConnected,] = useState(false);

  const connectWallet = async () => {
    try {
      await getProviderAndSigner();
      setWalletConnected(true);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return (
    <div className="App">
      <h1>Coin Flip Game</h1>
      <ConnectWalletButton connectWallet={connectWallet} walletConnected={walletConnected}  />
      <p>{walletConnected && <BetForm />}</p>
      
      </div>


    

    
  );
}

export default App;
