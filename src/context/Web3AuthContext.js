/* Web3AuthContext.jsx */
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  CHAIN_NAMESPACES,
  WEB3AUTH_NETWORK,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import rpc from "../blockchain/ethersUtils";
import { useHistory } from "react-router-dom";
import {
  getAdminByEmail,
  updateStudentAddressByEmail,
} from "../apis/cockroach";

const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const uiconfig = {
  loginMethodsOrder: ["google"],
  appName: "VKU certificate",
  logoLight:
    "https://raw.githubusercontent.com/ThaiKhim/certificate-validate/refs/heads/finalProject/public/images/web3light.png",
  logoDark:
    "https://raw.githubusercontent.com/ThaiKhim/certificate-validate/refs/heads/finalProject/public/images/web3dark.png",
};

const web3AuthOptions = {
  uiConfig: uiconfig,
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
};

const web3auth = new Web3Auth(web3AuthOptions);

console.log(web3auth);

const Web3AuthContext = createContext();

export const Web3AuthProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const init = async () => {
      const storedLoginState = localStorage.getItem("loggedIn");
      if (storedLoginState === "true") {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      try {
        await web3auth.initModal({
          modalConfig: {
            [WALLET_ADAPTERS.AUTH]: {
              label: "auth",
              loginMethods: {
                facebook: {
                  name: "facebook",
                  showOnModal: false,
                },
                reddit: {
                  name: "reddit",
                  showOnModal: false,
                },
                twitter: {
                  name: "twitter",
                  showOnModal: false,
                },
                discord: {
                  name: "discord",
                  showOnModal: false,
                },
                apple: {
                  name: "apple",
                  showOnModal: false,
                },
                twitch: {
                  name: "twitch",
                  showOnModal: false,
                },
                line: {
                  name: "line",
                  showOnModal: false,
                },
                kakao: {
                  name: "line",
                  showOnModal: false,
                },
                linkedin: {
                  name: "linkedin",
                  showOnModal: false,
                },
                weibo: {
                  name: "weibo",
                  showOnModal: false,
                },
                wechat: {
                  name: "wechat",
                  showOnModal: false,
                },
                farcaster: {
                  name: "farcaster",
                  showOnModal: false,
                },
                github: {
                  name: "github",
                  showOnModal: false,
                },
                sms_passwordless: {
                  name: "sms_passwordless",
                  showOnModal: false,
                },
              },
            },
          },
        });
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    try {
      const web3authProvider = await web3auth.connect();

      console.log(web3authProvider);

      const user = await web3auth.getUserInfo();
      const address = await rpc.getAccounts(web3authProvider);
      const privateKey = await web3authProvider.request({
        method: "eth_private_key",
      });

      console.log(privateKey);

      localStorage.setItem("ADDRESS", address);
      localStorage.setItem("USER", JSON.stringify(user));
      localStorage.setItem("PRIVATEKEY", privateKey);
      localStorage.setItem("loggedIn", "true");

      setProvider(web3authProvider);
      setLoggedIn(true);

      const admin = await getAdminByEmail(user.email);
      setIsAdmin(!!admin);

      if (admin) {
        history.push("/search01");
      } else {
        await updateStudentAddressByEmail(user.email, address);
        history.push("/profile");
      }
    } catch (error) {
      if (
        error.message === "User closed the modal" ||
        error.message === "login popup has been closed by the user"
      ) {
        return;
      }
    }
  };

  const logout = async () => {
    await web3auth.logout();

    setProvider(null);
    setLoggedIn(false);
    setIsAdmin(false);

    localStorage.removeItem("ADDRESS");
    localStorage.removeItem("USER");
    localStorage.removeItem("PRIVATEKEY");
    localStorage.removeItem("loggedIn");

    history.push("/");
  };

  return (
    <Web3AuthContext.Provider
      value={{ login, logout, provider, loggedIn, isAdmin }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};

export const useWeb3Auth = () => {
  return useContext(Web3AuthContext);
};
