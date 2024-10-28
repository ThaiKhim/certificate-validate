import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Header.module.sass";
import Icon from "../Icon";
import Image from "../Image";
import Notification from "./Notification";
import User from "./User";
import { useWeb3Auth } from "../../context/Web3AuthContext";

const nav = [
  {
    url: "/search01",
    title: "Certificates",
  },
  {
    url: "/faq",
    title: "FAQ",
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

  const user = localStorage.getItem("USER");
  const address = localStorage.getItem("ADDRESS");

  const { login, logout, provider, loggedIn } = useWeb3Auth();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(search);
  };

  const RenderBtn = () => {
    return (
      <>
        <Link
          className={cn("button-small", styles.button)}
          to="/upload-variants"
        >
          Upload
        </Link>
      </>
    );
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
              <Link className={styles.link} to={x.url} key={index}>
                {x.title}
              </Link>
            ))}
          </nav>
        </div>
        <Notification className={styles.notification} />

        {loggedIn ? (
          <>
            <RenderBtn />
            <User
              className={styles.user}
              onClick={logout}
              Userinfo={JSON.parse(user)}
              address={address}
            />
          </>
        ) : (
          // If the user is not connected
          <button className={cn("button-small", styles.button)} onClick={login}>
            Sign in
          </button>
        )}

        <button
          className={cn(styles.burger, { [styles.active]: visibleNav })}
          onClick={() => setVisibleNav(!visibleNav)}
        ></button>
      </div>
    </header>
  );
};

export default Headers;
