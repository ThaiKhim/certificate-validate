import React, { useState } from "react";
import cn from "classnames";
import styles from "./Status.module.sass";
import Icon from "../../../components/Icon";

const Status = ({ className, isCertificateValid }) => {
  return (
    <div className={cn(className, styles.checkout)}>
      <div className={cn("h4", styles.title)}>Validate Certificate</div>
      {isCertificateValid ? (
        <div>
          <div className={styles.iconCheckCenter}>
            <Icon name="check" size="64" />
          </div>
          <div className={styles.head}>
            <div className={styles.details}>
              <div className={styles.info}>Valid Certificate</div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div>
            <div className={styles.iconErrorCenter}>
              <Icon name="error" size="64" viewBox="-3.5 0 19 19" />
            </div>
            <div className={styles.head}>
              <div className={styles.details}>
                <div className={styles.info}>Invalid Certificate</div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className={styles.btns}>
        <button className={cn("button", styles.button)}>
          <span>Done</span>
        </button>
      </div>
    </div>
  );
};

export default Status;
