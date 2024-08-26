// src/components/BetForm.js
import React, { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS, getProviderAndSigner } from "../utils/contractConfig";

const BetForm = () => {
  const [selectedSide, setSelectedSide] = useState(null);
  const [betAmount, setBetAmount] = useState("");
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [canWithdraw, setCanWithdraw] = useState(false);

  const placeBet = async () => {
    if (!selectedSide || !betAmount) {
      alert("Please select a side and enter an amount!");
      return;
    }

    const { signer } = await getProviderAndSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    try {
      const transaction = await contract.placeBet(selectedSide === "heads" ? 0 : 1, {
        value: ethers.utils.parseEther(betAmount),
      });
      await transaction.wait();

      // Fetch the result (the result is emitted in the event)
      const receipt = await signer.provider.getTransactionReceipt(transaction.hash);
      const betEvent = receipt.logs.find(log => log.topics[0] === ethers.utils.id("BetSettled(bytes32,uint8,bool,uint256)"));

      if (betEvent) {
        const decodedLog = ethers.utils.defaultAbiCoder.decode(
          ["bytes32", "uint8", "bool", "uint256"],
          betEvent.data
        );
        const [requestId, result, won, payout] = decodedLog;

        setResult({
          result: result === 0 ? "Heads" : "Tails",
          won,
          payout: ethers.utils.formatEther(payout),
        });
        setCanWithdraw(won); // Show withdraw button if the user won
      } else {
        setErrorMessage("No result found.");
      }
    } catch (error) {
      console.error("Error placing bet:", error);
      setErrorMessage("Failed to place the bet.");
    }
  };

  const withdrawWinnings = async () => {
    const { signer } = await getProviderAndSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    try {
      const transaction = await contract.withdrawWinnings();
      await transaction.wait();
      alert("Winnings withdrawn successfully!");
    } catch (error) {
      console.error("Error withdrawing winnings:", error);
      setErrorMessage("Failed to withdraw winnings.");
    }
  };

  return (
    <div className="bet-form">
      <h3>Place Your Bet</h3>
      <div>
        <button onClick={() => setSelectedSide("heads")} className={selectedSide === "heads" ? "selected" : ""}>
          Heads
        </button>
        <button onClick={() => setSelectedSide("tails")} className={selectedSide === "tails" ? "selected" : ""}>
          Tails
        </button>
        <p>You Can bet Between 0.0001 to 0.001 ETH</p>
      </div>
      <input
        type="text"
        placeholder="Enter bet amount in ETH"
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
      />
      <button onClick={placeBet}>Place Bet</button>
      {result && (
        <div>
          <h4>Result: {result.result}</h4>
          <p>{result.won ? `You won! Payout: ${result.payout} ETH` : "You lost. Better luck next time!"}</p>
          {canWithdraw && <button onClick={withdrawWinnings}>Withdraw Winnings</button>}
        </div>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default BetForm;
