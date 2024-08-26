// src/components/ConnectWalletButton.js
import React from "react";
import { FaWallet } from "react-icons/fa";

const ConnectWalletButton = ({ connectWallet, walletConnected }) => {
  return (
    <button onClick={connectWallet} className="connect-wallet-button">
      {walletConnected ? "Wallet Connected" : "Connect Wallet"}
      <FaWallet style={{ marginLeft: "8px" }} />
    </button>
  );
};

export default ConnectWalletButton;