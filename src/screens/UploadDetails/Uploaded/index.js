import React from "react";
import cn from "classnames";
import styles from "./Uploaded.module.sass";
import Icon from "../../../components/Icon";

const Uploaded = ({ className, formdata, urls }) => {
  return (
    <div className={cn(className, styles.checkout)}>
      <div className={cn("h4", styles.title)}>
        Create Certificate Successfully
      </div>
      <div className={styles.desciption}>
        For <strong>{formdata.studentName}</strong> , with Studient's ID is{" "}
        <strong>{formdata.studentID}</strong>
      </div>
      <div className={styles.stage}>Detail Certificate</div>
      <div className={styles.head}>
        <div className={styles.details}>
          <div className={styles.info}>IPFS location</div>
          <div className={styles.text}>IPFS link to certificate metadata</div>
        </div>
        <a
          className={styles.icon}
          href={urls.ipfs}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="expand" size="30" viewBox="0 0 24 24" />
        </a>
      </div>
      <div className={styles.head}>
        <div className={styles.details}>
          <div className={styles.info}>Blockchain Location</div>
          <div className={styles.text}>
            Blockchain scan link to certificate data
          </div>
        </div>
        <a
          className={styles.icon}
          href={urls.scan}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="expand" size="30" viewBox="0 0 24 24" />
        </a>
      </div>
      <div className={styles.btns}>
        <button className={cn("button", styles.button)}>Done</button>
      </div>
    </div>
  );
};

export default Uploaded;
