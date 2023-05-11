import React, { useState, useEffect, useContext } from "react";
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
import { ProviderContext } from "../providerContext/providerContext,";

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
  "BMkKHE4n2KgzLWFXDmpCVIpWMggQ8Pe8_4pRkbm9aNafKnn0WRlb1zoy6JlOh2nN2Aw54jIAbFbsAUut3tuJr8w";

const Headers = () => {
  const [visibleNav, setVisibleNav] = useState(false);
  const [search, setSearch] = useState("");
  const [web3auth, setWeb3auth] = useState(null);
  const [address, setAddress] = useState("");
  const [userData, setUserData] = useState({});
  const { provider, setProvider } = useContext(ProviderContext);
  const userTest = localStorage.getItem("USER");
  const addressTest = localStorage.getItem("ADDRESS")
  useEffect(() => {
    //Initialize within your constructor
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: "https://rpc-mumbai.maticvigil.com/",
          },
          uiConfig: {
            appLogo: "/images/VKUDegreeCircle.png", // Your App Logo Here
          },
          web3AuthNetwork: "cyan",
        });

        setWeb3auth(web3auth);
        await web3auth.initModal({
          modalConfig: {
            [WALLET_ADAPTERS.OPENLOGIN]: {
              label: "openlogin",
              loginMethods: {
                google: {
                  name: "google login",
                  logoDark:
                    "url to your custom logo which will shown in dark mode",
                },
                facebook: {
                  // it will hide the facebook option from the Web3Auth modal.
                  name: "facebook login",
                  showOnModal: false,
                },
                github: {
                  showOnModal: false,
                },
                twitter: {
                  showOnModal: false,
                },
                linkedin: {
                  showOnModal: false,
                },
                discord: {
                  showOnModal: false,
                },
                apple: {
                  showOnModal: false,
                },
                sms: {
                  showOnModal: false,
                },
                sms_passwordless: {
                  showOnModal: false,
                },
                reddit: {
                  showOnModal: false,
                },
                twitch: {
                  showOnModal: false,
                },
                line: {
                  showOnModal: false,
                },
                kakao: {
                  showOnModal: false,
                },
                weibo: {
                  showOnModal: false,
                },
                wechat: {
                  showOnModal: false,
                },
              },
              // setting it to false will hide all social login methods from modal.
              showOnModal: true,
            },
          },
        });
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const handleSubmit = (e) => {
    alert();
  };

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    const user = await web3auth.getUserInfo();
    setUserData(user);
    console.log(user);
    const rpc = new RPC(web3authProvider);
    const address = await rpc.getAccounts();
    localStorage.setItem("ADDRESS", address);
    localStorage.setItem("USER", JSON.stringify(user));
    setAddress(address);
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
  };

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
    </header>
  );
};

export default Headers;
