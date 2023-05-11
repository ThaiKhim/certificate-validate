import React, { useState, useEffect, useCallback, createContext } from "react";
import { Link, NavLink } from "react-router-dom";
import cn from "classnames";
import styles from "./Header.module.sass";
import Icon from "../Icon";
import Image from "../Image";
import Notification from "./Notification";
import User from "./User";
import RPC from "../Blockchain/web3rpc";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";

const nav = [
  {
    url: "/search01",
    title: "Discover",
  },
  {
    url: "/faq",
    title: "How it work",
  },
  {
    url: "/item",
    title: "Create item",
  },
  {
    url: "/profile",
    title: "Profile",
  },
];

const clientId =
  "BC-BMkKHE4n2KgzLWFXDmpCVIpWMggQ8Pe8_4pRkbm9aNafKnn0WRlb1zoy6JlOh2nN2Aw54jIAbFbsAUut3tuJr8w";
export const Providercontext = createContext();

const Headers = () => {
  const [visibleNav, setVisibleNav] = useState(false);
  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState(null);
  const [web3auth, setWeb3auth] = useState(null);
  const [address, setAddress] = useState("");
  const [userData, setUserData] = useState({});
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const web3auth = new Web3Auth({
        clientId,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0xaa36a7",
          rpcTarget: "https://rpc.sepolia.org/",
        },
      });

      console.log("======= useEffect web3auth", web3auth);
      setWeb3auth(web3auth);
      await web3auth.initModal();
      setProvider(web3auth.provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    alert();
  };

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    console.log({ web3authProvider });
    if (web3authProvider) {
      console.log("DA CO PROVIDER login");
      setProvider(web3authProvider);
    } else {
      console.log("DEO CO PROVIDER login");
    }

    const user = await web3auth.getUserInfo();
    console.log(user);
    const rpc = new RPC(web3authProvider);
    const address = await rpc.getAccounts();
    const id = await rpc.getChainId();
    localStorage.setItem("ADDRESS", address);
    localStorage.setItem("USER", JSON.stringify(user));
    setAddress(address);
    console.log(address);
    console.log(provider);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.logout();
    setProvider(web3authProvider);
    setAddress("");
    setUserData({});
    localStorage.clear();
  };

  console.log({ userTest });

  return (
    <header className={styles.header}>
      <div className={cn("container", styles.container)}>
        <Link className={styles.logo} to="/">
          <Image
            className={styles.pic}
            src="/images/logo-dark.png"
            srcDark="/images/logo-light.png"
            alt="VKU Degree"
          />
        </Link>
        <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
          <nav className={styles.nav}>
            {nav.map((x, index) => (
              <Link
                className={styles.link}
                // activeClassName={styles.active}
                to={x.url}
                key={index}
              >
                {x.title}
              </Link>
            ))}
          </nav>
          <form
            className={styles.search}
            action=""
            onSubmit={() => handleSubmit()}
          >
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              placeholder="Search"
              required
            />
            <button className={styles.result}>
              <Icon name="search" size="20" />
            </button>
          </form>
        </div>
        <Notification className={styles.notification} />
        <>
          {provider ? (
            <>
              <Link
                className={cn("button-small", styles.button)}
                to="/upload-variants"
              >
                Upload
              </Link>

              <User
                className={styles.user}
                onClick={logout}
                Userinfo={JSON.parse(userTest)}
                address={addressTest}
              />
            </>
          ) : (
            <button
              className={cn("button-small", styles.button)}
              to="#"
              onClick={login}
            >
              Login
            </button>
          )}
        </>

        {/* <Link
          className={cn("button-stroke button-small", styles.button)}
          to="/connect-wallet"
        >
          Connect Wallet
        </Link> */}

        <button
          className={cn(styles.burger, { [styles.active]: visibleNav })}
          onClick={() => setVisibleNav(!visibleNav)}
        ></button>
      </div>
      <Providercontext.Provider
        value={{ provider, setProvider }}
      ></Providercontext.Provider>
    </header>
  );
};

export default Headers;
