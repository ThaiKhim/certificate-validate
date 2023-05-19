import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import Theme from "../../Theme";

const items = [
  {
    title: "My profile",
    icon: "user",
    url: "/profile",
  },
  // {
  //   title: "My items",
  //   icon: "image",
  //   url: "/item",
  // },
  {
    title: "Dark theme",
    icon: "bulb",
  },
  {
    title: "LogOut",
    icon: "exit",
    url: "#"
  },
];

const User = ({ className, onClick, Userinfo, address }) => {
  const [visible, setVisible] = useState(false);

  function handleCopy() {
    const address = localStorage.getItem('ADDRESS');
    navigator.clipboard.writeText(address);
  }
  
  const truncatedAddress = address?.slice(0, 6) + "..." + address?.slice(-6);


  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.user, className)}>
        <div className={styles.head} onClick={() => setVisible(!visible)}>
          <div className={styles.avatar}>
            <img src={Userinfo?.profileImage} alt="Avatar" />
          </div>
          <div className={styles.wallet}>{Userinfo?.name}</div>
        </div>
        {visible && (
          <div className={styles.body}>
            <div className={styles.name}>{Userinfo?.name}</div>
            <div className={styles.code}>
              <div className={styles.number}>{truncatedAddress}</div>
              <button className={styles.copy} onClick={handleCopy}>
                <Icon name="copy" size="16" />
              </button>
            </div>
            {/* <div className={styles.wrap}>
              <div className={styles.line}>
                <div className={styles.preview}>
                  <img
                    src="/images/content/etherium-circle.jpg"
                    alt="Etherium"
                  />
                </div>
                <div className={styles.details}>
                  <div className={styles.info}>Balance</div>
                  <div className={styles.price}>4.689 ETH</div>
                </div>
              </div>
              <button
                className={cn("button-stroke button-small", styles.button)}
              >
                Manage fun on Coinbase
              </button>
            </div> */}
            <div className={styles.menu}>
           

              {items.map((x, index) =>
                x.url ? (
                  x.url.startsWith("#") ? (
                    <div
                      className={styles.item}
                      href={x.url}
                      key={index}
                      onClick={onClick}
                    >
                      <div className={styles.icon}>
                        <Icon name={x.icon} size="20" />
                      </div>
                      <div className={styles.text}>{x.title}</div>
                    </div>
                  ) : (
                    <Link
                      className={styles.item}
                      to={x.url}
                      onClick={() => setVisible(!visible)}
                      key={index}
                    >
                      <div className={styles.icon}>
                        <Icon name={x.icon} size="20" />
                      </div>
                      <div className={styles.text}>{x.title}</div>
                    </Link>
                  )
                ) : (
                  <div className={styles.item} key={index}>
                    <div className={styles.icon}>
                      <Icon name={x.icon} size="20" />
                    </div>
                    <div className={styles.text}>{x.title}</div>
                    <Theme className={styles.theme} />
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default User;
