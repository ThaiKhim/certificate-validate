import React, { useState } from "react";
import cn from "classnames";
import styles from "./Verify.module.sass";
import Icon from "../../../../components/Icon";

const Verify = ({ className, txhash }) => {
  // const [buttonText, setButtonText] = useState("Done");

  return (
    <div className={cn(className, styles.checkout)}>
      <div className={cn("h4", styles.title)}>Verify Certificate</div>
      <div>
        <div className={styles.iconCenter}>
          <Icon name="check" size="24" />
        </div>
        <div className={styles.head}>
          <div className={styles.details}>
            <div className={styles.info}>Verify successfully</div>
            <div className={styles.text}>Link to verify transaction</div>
          </div>
          <a
            className={styles.icon}
            href={txhash}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="arrow-expand" size="24" />
          </a>
        </div>
      </div>
      <div className={styles.btns}>
        <button className={cn("button", styles.button)}>
          <span>Done</span>
        </button>
      </div>
    </div>
  );
};

export default Verify;
