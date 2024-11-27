import React from "react";
import cn from "classnames";
import styles from "./Users.module.sass";
import VerifyStatus from "../../.././components/VerifyStatus";

const truncateAddress = (address) => {
  if (!address || address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const Users = ({ className, items }) => {
  return (
    <div className={cn(styles.users, className)}>
      <div className={styles.list}>
        {items.map((x, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.avatar}>
              <img
                src="/images/content/avatar-graduate-lecturer.png"
                alt="Avatar"
              />
              {x.reward && (
                <div className={styles.reward}>
                  <img src={x.reward} alt="Reward" />
                </div>
              )}
            </div>
            <div className={styles.details}>
              <div className={styles.name}>{x.name}</div>
              <div className={styles.position}>
                {truncateAddress(x.address)}
              </div>
            </div>
            <VerifyStatus verified={x.verified} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
