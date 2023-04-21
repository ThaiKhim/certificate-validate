import React, { useState, useEffect, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import cn from "classnames";
import styles from "./Header.module.sass";
import Icon from "../Icon";
import Image from "../Image";
import Notification from "./Notification";
import User from "./User";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";

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

const Headers = () => {
  const [visibleNav, setVisibleNav] = useState(false);
  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState(null)
  const [web3auth, setWeb3auth] = useState(null)

  useEffect(() => {
    //Initialize within your constructor
    const init = async () => {
      const web3auth = new Web3Auth({
        clientId: "BC-LggdNK_JcCPHj1TwNrE1Hvrnsxg5vXQqX7Diq3x9CZbib7QmwKkWP5ICd6V_UucBwjeE6866ZUussYzy97L8", // Get your Client ID from Web3Auth Dashboard
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.OTHER,
        },
      });

    setWeb3auth(web3auth);

        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
    }
    init()
  })

  const handleSubmit = (e) => {
    alert();
  };

  const handleConnectLogin = useCallback(async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  }, [])

  return (
    <header className={styles.header}>
      <div className={cn("container", styles.container)}>
        <Link className={styles.logo} to="/">
          <Image
            className={styles.pic}
            src="/images/logo-dark.png"
            srcDark="/images/logo-light.png"
            alt="Fitness Pro"
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
          <Link
            className={cn("button-small", styles.button)}
            to="/upload-variants"
          >
            Upload
          </Link>
        </div>
        <Notification className={styles.notification} />
        <Link
          className={cn("button-small", styles.button)}
          to="/upload-variants"
        >
          Upload
        </Link>
        <button
          className={cn("button-small", styles.button)}
          to="#"
          onClick={handleConnectLogin}
          >
          Login
        </button>
        {/* <Link
          className={cn("button-stroke button-small", styles.button)}
          to="/connect-wallet"
        >
          Connect Wallet
        </Link> */}
        {/*<User className={styles.user} />*/}
        <button
          className={cn(styles.burger, { [styles.active]: visibleNav })}
          onClick={() => setVisibleNav(!visibleNav)}
        ></button>
      </div>
    </header>
  );
};

export default Headers;
