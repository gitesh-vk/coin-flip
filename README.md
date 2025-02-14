# Live Link

https://coin-flip-bice.vercel.app/

# # Coin Flip Game on Arbitrum Sepolia Testnet

# Description

This is a decentralized Coin Flip Game built on the Arbitrum Sepolia testnet. Users can connect their wallets, place a bid, and choose either "Heads" or "Tails." The result is randomly generated, and if the user wins, they can withdraw their profit. If they lose, they forfeit their bid amount.

# Features

Connect wallet using Arbitrum Sepolia network.

Place a bid and choose "Heads" or "Tails."

Randomly generated results.

Winning users can withdraw their profit.

Built with React.js for the frontend and Solidity for the smart contract.

# Tech Stack

Blockchain Network: Arbitrum Sepolia Testnet

Frontend: React.js

Smart Contract: Solidity

Development Framework: Hardhat

#  Installation

# Prerequisites

Node.js (v16 or later recommended)

MetaMask (configured for Arbitrum Sepolia)

Hardhat installed globally (npm install -g hardhat)

# Steps

Clone the repository:

git clone https://github.com/gitesh-vk/coin-flip.git
cd coin-flip

# Install dependencies:

npm install

# Compile the smart contract:

npx hardhat compile

Deploy the smart contract to Arbitrum Sepolia:

npx hardhat run scripts/deploy.js --network arbitrumSepolia

# Start the frontend:

npm start

# Usage

Connect your MetaMask wallet (ensure it's set to Arbitrum Sepolia).

Choose "Heads" or "Tails."

Enter your bid amount and place the bet.

Wait for the result to be randomly generated.

If you win, you can withdraw your profit.

# Smart Contract Deployment

Ensure you have a .env file with the following:

PRIVATE_KEY=your_wallet_private_key
ALCHEMY_API_KEY=your_alchemy_api_key

Modify hardhat.config.js to include Arbitrum Sepolia network settings.
