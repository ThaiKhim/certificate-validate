import React, { useState } from "react";
import cn from "classnames";
import styles from "./User.module.sass";
import Icon from "../../../components/Icon";
import Report from "../../../components/Report";
import Modal from "../../../components/Modal";
import { FacebookShareButton, TwitterShareButton } from "react-share";
// import { isStepDivisible } from "react-range/lib/utils";


const shareUrlFacebook = "#";
const shareUrlTwitter = "#";



const User = ({ className, item }) => {
  const [visible, setVisible] = useState(false);
  const [visibleShare, setVisibleShare] = useState(false);
  const [visibleModalReport, setVisibleModalReport] = useState(false);
  const userTest = localStorage.getItem("USER");
  const userinfo= JSON.parse(userTest);
  const addressTest = localStorage.getItem("ADDRESS");
  const truncatedAddress = addressTest?.slice(0, 6) + "..." + addressTest?.slice(-6);
  const userprikey = localStorage.getItem("PRIVATEKEY")

  const [buttonText, setButtonText] = useState('Primary Key');
  const [copiedText, setCopiedText] = useState(false);



  function handleCopy() {
    // const truncatedAddressCopy = document.querySelector(".User_number__4PD\\+0");
    
    navigator.clipboard.writeText(addressTest);
  }

  function handleCopyprikey() {
    // const truncatedAddressCopy = document.querySelector(".User_number__4PD\\+0");
    
    navigator.clipboard.writeText(userprikey);
    setButtonText('Copied');
    setCopiedText(true);
  }
  

  return (
    <>
      <div className={cn(styles.user, className)}>
        <div className={styles.avatar}>
          <img src={userinfo.profileImage} alt="Avatar" />
        </div>
        <div className={styles.name}>{userinfo.name}</div>
        <div className={styles.code}>
          <div className={styles.number}>{truncatedAddress}</div>
          <button className={styles.copy} onClick={handleCopy}>
            <Icon name="copy" size="16" />
          </button>
          {/* <button className={styles.copy_pri} onClick={handleCopyprikey}>
            <Icon name="copy" size="16" />
          </button> */}
        </div>
        {/* <div className={styles.info}>
          A wholesome farm owner in Montana. Upcoming gallery solo show in
          Germany
        </div> */}
        <a
          className={styles.site}
          href={`mailto:${userinfo.email}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="globe" size="16" />
          <span>{userinfo.email}</span>
        </a>
        <div className={styles.control}>
          <div className={styles.btns}>
          <button
            className={cn(
              'button button-small',
              { [styles.active]: copiedText },
              styles.button
            )}
            onClick={handleCopyprikey}
          >
            <span>{buttonText}</span>
            <span>Copied</span>
          </button>
            <button
              className={cn(
                "button-circle-stroke button-small",
                { [styles.active]: visibleShare },
                styles.button
              )}
              onClick={() => setVisibleShare(!visibleShare)}
            >
              <Icon name="share" size="20" />
            </button>
            {/* <button
              className={cn("button-circle-stroke button-small", styles.button)}
              onClick={() => setVisibleModalReport(true)}
            >
              <Icon name="report" size="20" />
            </button> */}
          </div>
          <div className={cn(styles.box, { [styles.active]: visibleShare })}>
            <div className={styles.stage}>Share link to this page</div>
            <div className={styles.share}>
              <TwitterShareButton
                className={styles.direction}
                url={shareUrlTwitter}
              >
                <span>
                  <Icon name="twitter" size="20" />
                </span>
              </TwitterShareButton>
              <FacebookShareButton
                className={styles.direction}
                url={shareUrlFacebook}
              >
                <span>
                  <Icon name="facebook" size="20" />
                </span>
              </FacebookShareButton>
            </div>
          </div>
        </div>
        {/* <div className={styles.socials}>
          {item.map((x, index) => (
            <a
              className={styles.social}
              href={x.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              <Icon name={x.title} size="20" />
            </a>
          ))}
        </div> */}
        {/* <div className={styles.note}>Member since Mar 15, 2021</div> */}
      </div>
      <Modal
        visible={visibleModalReport}
        onClose={() => setVisibleModalReport(false)}
      >
        <Report />
      </Modal>
    </>
  );
};

export default User;