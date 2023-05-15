import Web3 from "web3";
const ABI = require("./DegreeNFT.json");
const Address = process.env.REACT_APP_DEGREE_CONTRACT;

export default class RPC {
  constructor(provider) {
    this.provider = provider;
  }

  async getChainId() {
    try {
      const web3 = new Web3(this.provider);

      // Get the connected Chain's ID
      const chainId = await web3.eth.getChainId();

      return chainId.toString();
    } catch (error) {
      return error;
    }
  }

  async getAccounts() {
    try {
      const web3 = new Web3(this.provider);

      // Get user's Ethereum public address
      const address = (await web3.eth.getAccounts())[0];
      console.log(web3);
      return address;
    } catch (error) {
      return error;
    }
  }
  async getBalance() {
    try {
      const web3 = new Web3(this.provider);

      // Get user's Ethereum public address
      const address = (await web3.eth.getAccounts())[0];

      // Get user's balance in ether
      const balance = web3.utils.fromWei(
        await web3.eth.getBalance(address) // Balance is in wei
      );

      return balance;
    } catch (error) {
      return error;
    }
  }
  async getPrivateKey() {
    try {
      const privateKey = await this.provider.request({
        method: "eth_private_key",
      });

      return privateKey;
    } catch (error) {
      return error;
    }
  }
  async CreateDegree(url, prikey, studentid) {
    try {
      //create provider and interface to contact with blockchai and smart contract
      const web3 = new Web3(this.provider);
      const contract = new web3.eth.Contract(ABI, Address);
      const pubkey = web3.eth.accounts.privateKeyToAccount(prikey);
      //create data for transaction
      const data = contract.methods
        .createDegree(url, studentid.toString())
        .encodeABI();
      //get nonce of execute transaction wallet
      const nonce = await web3.eth.getTransactionCount(pubkey.address);
      console.log(pubkey.address, pubkey);
      //create transaction
      const gasPrice = await web3.eth.getGasPrice();
      const gasLimit = 500000;
      const tx = {
        from: pubkey.address,
        to: Address,
        nonce: nonce,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        data: data,
      };
      const signedTx = await pubkey.signTransaction(tx);
      console.log(web3.currentProvider);
      await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        (error, txHash) => {
          if (!error) {
            console.log("Transaction hash:", txHash);
          } else {
            console.error(error);
          }
        }
      );
      console.log("success!!!!!!!!!!!!!!!!!!!!!!!");
    } catch (error) {
      console.log("Error cmnr");
      console.log(error);
    }
  }
}
