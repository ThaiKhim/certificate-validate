import type { IProvider } from "@web3auth/base";
import { ContractFactory, ethers } from "ethers";

import { IWalletProvider } from "./walletProvider";

const ethersWeb3Provider = (
  provider: IProvider | null,
  uiConsole: (...args: unknown[]) => void
): IWalletProvider => {
  const ensureProvider = (): IProvider => {
    if (!provider) {
      throw new Error("Web3 provider is not available.");
    }
    return provider;
  };

  const getPublicKey = async (): Promise<string> => {
    try {
      const pubKey: string = await ensureProvider()
        .request({
          method: "public_key",
        })
        .toString();
      return pubKey.slice(2) as string;
    } catch (error: any) {
      uiConsole(error);
      return error.toString();
    }
  };

  const getAddress = async (): Promise<string> => {
    try {
      const ethersProvider = new ethers.BrowserProvider(
        ensureProvider() as any
      );
      const signer = await ethersProvider.getSigner();
      const address = await signer.getAddress();
      return address;
    } catch (error: any) {
      uiConsole(error);
      return error.toString();
    }
  };

  const getChainId = async (): Promise<string> => {
    try {
      const ethersProvider = new ethers.BrowserProvider(
        ensureProvider() as any
      );
      return (await ethersProvider.getNetwork()).chainId.toString(16);
    } catch (error: any) {
      uiConsole(error);
      return error.toString();
    }
  };

  const getBalance = async (): Promise<string> => {
    try {
      const ethersProvider = new ethers.BrowserProvider(
        ensureProvider() as any
      );
      const signer = await ethersProvider.getSigner();
      const address = await signer.getAddress();
      const res = ethers.formatEther(await ethersProvider.getBalance(address));
      const balance = (+res).toFixed(4);
      return balance;
    } catch (error: any) {
      uiConsole(error);
      return error.toString();
    }
  };

  const getSignature = async (message: string): Promise<string> => {
    try {
      const ethersProvider = new ethers.BrowserProvider(
        ensureProvider() as any
      );
      const signer = await ethersProvider.getSigner();
      const signedMessage = await signer.signMessage(message);
      return signedMessage;
    } catch (error: any) {
      uiConsole(error);
      return error.toString();
    }
  };

  const sendTransaction = async (
    amount: string,
    destination: string
  ): Promise<string> => {
    try {
      const ethersProvider = new ethers.BrowserProvider(
        ensureProvider() as any
      );
      const signer = await ethersProvider.getSigner();
      const amountBigInt = ethers.parseEther(amount);
      const tx = await signer.sendTransaction({
        to: destination,
        value: amountBigInt,
        maxPriorityFeePerGas: "5000000000",
        maxFeePerGas: "6000000000000",
      });

      return `Transaction Hash: ${tx.hash}`;
    } catch (error: any) {
      uiConsole(error);
      return error as string;
    }
  };

  const getPrivateKey = async (): Promise<string> => {
    try {
      const privateKey = await ensureProvider()?.request({
        method: "eth_private_key",
      });

      return privateKey as string;
    } catch (error: any) {
      uiConsole(error);
      return error as string;
    }
  };

  const deployContract = async (
    contractABI: string,
    contractByteCode: string,
    initValue: string
  ): Promise<any> => {
    try {
      const ethersProvider = new ethers.BrowserProvider(
        ensureProvider() as any
      );
      const signer = await ethersProvider.getSigner();
      const factory = new ContractFactory(
        JSON.parse(contractABI),
        contractByteCode,
        signer
      );

      const contract = await factory.deploy(initValue);
      uiConsole("Contract:", contract);
      uiConsole(
        `Deploying Contract at Target: ${contract.target}, waiting for confirmation...`
      );

      const receipt = await contract.waitForDeployment();
      uiConsole("Contract Deployed. Receipt:", receipt);

      return receipt;
    } catch (error: any) {
      uiConsole(error);
      return error as string;
    }
  };

  const readContract = async (contractAddress: string, contractABI: any) => {
    try {
      const ethersProvider = new ethers.BrowserProvider(
        ensureProvider() as any
      );
      const signer = await ethersProvider.getSigner();
      uiConsole(contractABI);

      const contract = new ethers.Contract(
        contractAddress,
        JSON.parse(contractABI),
        signer
      );

      const message = await contract.message();
      return message;
    } catch (error: any) {
      uiConsole(error);
      return error as string;
    }
  };

  const writeContract = async (
    contractAddress: string,
    contractABI: any,
    updatedValue: string
  ) => {
    try {
      const ethersProvider = new ethers.BrowserProvider(
        ensureProvider() as any
      );
      const signer = await ethersProvider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        JSON.parse(JSON.stringify(contractABI)),
        signer
      );

      const tx = await contract.update(updatedValue);
      const receipt = await tx.wait();
      return receipt;
    } catch (error: any) {
      uiConsole(error);
      return error as string;
    }
  };

  return {
    getAddress,
    getBalance,
    getChainId,
    getSignature,
    sendTransaction,
    getPrivateKey,
    deployContract,
    readContract,
    writeContract,
    getPublicKey,
  };
};

export default ethersWeb3Provider;
