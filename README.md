# NFT Degree 
This project is a decentralized application (dApp) that enables users to earn NFT degrees through completing courses
## Overview

The NFT Degree dApp allows users to browse through a list of available courses and enroll in ones that they are interested in. Each course has a set of tasks that must be completed before the user can earn the NFT degree associated with that course. Once all tasks are completed, the user can claim their NFT degree and add it to their digital wallet.

The dApp is built using React and utilizes web3.js to interact with the Ethereum blockchain. The smart contracts for the NFT degrees are written in Solidity and are deployed on the Ethereum network.

### Getting Started

To run the dApp locally, follow these steps:

Clone the repository
1. Install the necessary dependencies by running `yarn install`
2. Start the development server by running `yarn start`
3. Visit http://localhost:3000 in your web browser

### Available Scripts

In addition to yarn start, the following scripts are available:

- `yarn test`: Launches the test runner in the interactive watch mode.
- `yarn build`: Builds the app for production to the build folder.
- `yarn eject`: Ejects the app from Create React App, giving full control over configuration files and dependencies.

### Learn More

To learn more about the technologies used in this project, check out the following documentation:

- React: https://reactjs.org/docs/getting-started.html
- web3.js: https://web3js.readthedocs.io/en/v1.3.4/
- Solidity: https://docs.soliditylang.org/en/v0.8.7/

### Deployment

To deploy the dApp to the Ethereum network, follow these steps:

1. Compile the Solidity smart contracts by running `hardhat compile`
2. Deploy the contracts to the network of your choice by running `hardhat migrate`
3. Update the `src/constants.j`s file with the contract addresses and ABI
4. Build the dApp by running `yarn build`
5. Deploy the build folder to a web server of your choice

### Troubleshooting

If you encounter any issues while running the dApp, check out the troubleshooting guide in the Create React App documentation: https://create-react-app.dev/docs/troubleshooting/

