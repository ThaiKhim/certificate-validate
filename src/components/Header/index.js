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

  // Use the Web3Auth context
  const { login, logout, provider, loggedIn } = useWeb3Auth();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    alert(search); // Display the search input value
  };

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
              <Link className={styles.link} to={x.url} key={index}>
                {x.title}
              </Link>
            ))}
          </nav>
          <form className={styles.search} onSubmit={handleSubmit}>
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

        {/* Conditional rendering for Login/Logout */}
        {loggedIn ? ( // If the user is connected
          <button
            className={cn("button-small", styles.button)}
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          // If the user is not connected
          <button className={cn("button-small", styles.button)} onClick={login}>
            Login
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
