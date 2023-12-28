import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Profile.module.sass";
import Icon from "../../components/Icon";
import User from "./User";
import Items from "./Items";
import Followers from "./Followers";

// data
import { cert } from "../../mocks/cert";
import { isStepDivisible } from "react-range/lib/utils";

const navLinks = ["Verified", "Awaiting Confirmations"];

const socials = [
  {
    title: "twitter",
    url: "https://twitter.com/ui8",
  },
  {
    title: "instagram",
    url: "https://www.instagram.com/ui8net/",
  },
  {
    title: "facebook",
    url: "https://www.facebook.com/ui8.net/",
  },
];

const Profile = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.profile}>
      <div
        className={cn(styles.head, { [styles.active]: visible })}
        style={{
          backgroundImage: "url(/images/content/bg-profile.jpg)",
        }}
      >
        <div className={cn("container", styles.container)}>
          <div className={styles.btns}>
            <button
              className={cn("button-stroke button-small", styles.button)}
              onClick={() => setVisible(true)}
            >
              <span>Edit cover photo</span>
              <Icon name="edit" size="16" />
            </button>
            <Link
              className={cn("button-stroke button-small", styles.button)}
              to="profile-edit"
            >
              <span>Edit profile</span>
              <Icon name="image" size="16" />
            </Link>
          </div>
          <div className={styles.file}>
            <input type="file" />
            <div className={styles.wrap}>
              <Icon name="upload-file" size="48" />
              <div className={styles.info}>Drag and drop your photo here</div>
              <div className={styles.text}>or click to browse</div>
            </div>
            <button
              className={cn("button-small", styles.button)}
              onClick={() => setVisible(false)}
            >
              Save photo
            </button>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={cn("container", styles.container)}>
          <User className={styles.user} item={socials} />
          <div className={styles.wrapper}>
            <div className={styles.nav}>
              {navLinks.map((x, index) => (
                <button
                  className={cn(styles.link, {
                    [styles.active]: index === activeIndex,
                  })}
                  key={index}
                  onClick={() => setActiveIndex(index)}
                >
                  {x}
                </button>
              ))}
            </div>
            <div className={styles.group}>
              <div className={styles.item}>
                {activeIndex === 0 && (
                  <Items class={styles.items} items={cert.slice(0, 3)} />
                )}
                {activeIndex === 1 && (
                  <Items class={styles.items} items={cert.slice(0, 6)} />
                )}
                {activeIndex === 2 && (
                  <Items class={styles.items} items={cert.slice(0, 2)} />
                )}
                {activeIndex === 3 && (
                  <Items class={styles.items} items={cert.slice(0, 3)} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
