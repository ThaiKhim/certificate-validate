import {
  ADAPTER_STATUS,
  CustomChainConfig,
  IProvider,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import * as jose from "jose";
import { getWalletProvider, IWalletProvider } from "./walletProvider";
import { chain } from "../config/chainConfig";

export interface IWeb3AuthService {
  walletProvider: IWalletProvider | null;
  isLoading: boolean;
  address: string;
  balance: string;
  chainId: string;
  connectedChain: CustomChainConfig;
  getUserInfo: () => Promise<any>;
  getPublicKey: () => Promise<string>;
  getAddress: () => Promise<string>;
  getBalance: () => Promise<string>;
  getSignature: (message: string) => Promise<string>;
  sendTransaction: (amount: string, destination: string) => Promise<string>;
  getPrivateKey: () => Promise<string>;
  getChainId: () => Promise<string>;
  deployContract: (
    abi: any,
    bytecode: string,
    initValue: string
  ) => Promise<any>;
  readContract: (contractAddress: string, contractABI: any) => Promise<string>;
  writeContract: (
    contractAddress: string,
    contractABI: any,
    updatedValue: string
  ) => Promise<string>;
  getIdToken: () => Promise<string>;
  verifyServerSide: (idToken: string) => Promise<any>;
  switchChain: (customChainConfig: CustomChainConfig) => Promise<void>;
  updateConnectedChain: (network: string | CustomChainConfig) => void;
}

export class Web3AuthService {
  private uiConsole: (...args: unknown[]) => void;
  public walletProvider: IWalletProvider | null = null;
  public isLoading: boolean = false;
  public address: string = "";
  public balance: string = "";
  public chainId: string = "";
  public connectedChain: CustomChainConfig = chain.ethereum;
  private web3Auth: any;
  private provider: IProvider | null = null;

  constructor(uiConsole: (...args: unknown[]) => void, web3AuthInstance: any) {
    this.uiConsole = uiConsole;
    this.web3Auth = web3AuthInstance;
  }

  public async connect() {
    if (!this.web3Auth) {
      this.uiConsole("web3Auth not initialized yet");
      return;
    }

    try {
      this.isLoading = true;
      const { connect, status, provider } = useWeb3Auth();
      if (status === ADAPTER_STATUS.READY) {
        await connect();
        this.setWalletProvider(provider);
      } else if (status === ADAPTER_STATUS.CONNECTED) {
        this.setWalletProvider(provider);
      }
      this.isLoading = false;
    } catch (error) {
      this.uiConsole("Error connecting", error);
      this.isLoading = false;
    }
  }

  private async setWalletProvider(web3authProvider: IProvider | null) {
    this.walletProvider = getWalletProvider(web3authProvider, this.uiConsole);
    this.address = await this.walletProvider.getAddress();
    this.balance = await this.walletProvider.getBalance();
    this.chainId = await this.walletProvider.getChainId();
  }

  public async getUserInfo() {
    if (!this.web3Auth) {
      this.uiConsole("web3Auth not initialized yet");
      return;
    }
    return await this.web3Auth.userInfo;
  }

  public async getPublicKey() {
    if (!this.web3Auth) {
      this.uiConsole("web3Auth not initialized yet");
      return "";
    }

    if (!this.walletProvider) {
      this.uiConsole("walletProvider not initialized yet");
      return "";
    }

    return await this.walletProvider.getPublicKey();
  }

  public async getAddress() {
    if (!this.web3Auth) {
      this.uiConsole("web3Auth not initialized yet");
      return "";
    }

    if (!this.walletProvider) {
      this.uiConsole("walletProvider not initialized yet");
      return "";
    }

    return await this.walletProvider.getAddress();
  }

  public async getBalance() {
    if (!this.web3Auth) {
      this.uiConsole("web3Auth not initialized yet");
      return "";
    }

    if (!this.walletProvider) {
      this.uiConsole("walletProvider not initialized yet");
      return "";
    }

    return await this.walletProvider.getBalance();
  }

  public async getSignature(message: string) {
    if (!this.web3Auth) {
      this.uiConsole("web3Auth not initialized yet");
      return "";
    }

    if (!this.walletProvider) {
      this.uiConsole("walletProvider not initialized yet");
      return "";
    }

    return await this.walletProvider.getSignature(message);
  }

  public async sendTransaction(amount: string, destination: string) {
    if (!this.web3Auth) {
      this.uiConsole("web3Auth not initialized yet");
      return "";
    }

    if (!this.walletProvider) {
      this.uiConsole("walletProvider not initialized yet");
      return "";
    }

    return await this.walletProvider.sendTransaction(amount, destination);
  }

  public async getPrivateKey() {
    if (!this.web3Auth) {
      this.uiConsole("web3Auth not initialized yet");
      return "";
    }

    if (!this.walletProvider) {
      this.uiConsole("walletProvider not initialized yet");
      return "";
    }

    return await this.walletProvider.getPrivateKey();
  }

  public async deployContract(abi: any, bytecode: string, initValue: string) {
    if (!this.web3Auth) {
      this.uiConsole("web3Auth not initialized yet");
      return;
    }

    if (!this.walletProvider) {
      this.uiConsole("walletProvider not initialized yet");
      return "";
    }

    return await this.walletProvider.deployContract(abi, bytecode, initValue);
  }

  public async readContract(contractAddress: string, contractABI: any) {
    if (!this.provider) {
      this.uiConsole("provider not initialized yet");
      return;
    }

    if (!this.walletProvider) {
      this.uiConsole("walletProvider not initialized yet");
      return "";
    }

    return await this.walletProvider.readContract(contractAddress, contractABI);
  }

  public async writeContract(
    contractAddress: string,
    contractABI: any,
    updatedValue: string
  ) {
    if (!this.provider) {
      this.uiConsole("provider not initialized yet");
      return;
    }

    if (!this.walletProvider) {
      this.uiConsole("walletProvider not initialized yet");
      return "";
    }

    return await this.walletProvider.writeContract(
      contractAddress,
      contractABI,
      updatedValue
    );
  }

  public async getIdToken() {
    return await this.web3Auth.authenticateUser();
  }
}
