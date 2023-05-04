import { ethers } from "ethers";

export default class RPC {
  constructor(provider) {
    this.provider = provider;
    this.ethersProvider = new ethers.providers.JsonRpcProvider(this.provider);
  }

  async getChainId() {
    try {
      // Get the connected Chain's ID
      const chainId = await this.ethersProvider
        .getNetwork()
        .then((network) => network.chainId);

      return chainId.toString();
    } catch (error) {
      return error;
    }
  }

  async getAccounts() {
    try {
      // Get user's Ethereum public address
      const address = (await this.ethersProvider.listAccounts())[0];

      return address;
    } catch (error) {
      return error;
    }
  }

  async getBalance() {
    try {
      // Get user's Ethereum public address
      const address = (await this.ethersProvider.listAccounts())[0];

      // Get user's balance in ether
      const balance = ethers.utils.formatEther(
        await this.ethersProvider.getBalance(address) // Balance is in wei
      );

      return balance;
    } catch (error) {
      return error;
    }
  }

  async getPrivateKey() {
    try {
      const signer = this.ethersProvider.getSigner();
      const privateKey = await signer.getPrivateKey();

      return privateKey;
    } catch (error) {
      return error;
    }
  }
}
