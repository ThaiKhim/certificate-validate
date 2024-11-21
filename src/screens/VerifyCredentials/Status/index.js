import React from "react";
import cn from "classnames";
import styles from "./Status.module.sass";
import Icon from "../../../components/Icon";


const Status = ({ className }) => {
  return (
    <div className={cn(className, styles.steps)}>
      <div className={cn("h4", styles.title)}>Status</div>
      <div className={styles.list}>
        <div className={cn(styles.item, styles.done)}>
          <div className={styles.head}>
            <div className={styles.icon}>
              <Icon name="upload-file" size="24" />
            </div>
            <div className={styles.details}>
              <div className={styles.info}>Provided</div>
              <div className={styles.text}>This Certificate exists in our Database</div>
            </div>
          </div>
          <button className={cn("button", styles.button)}>Close</button>
        </div>
        
        
        <div className={cn(styles.item, styles.error)}>
          <div className={styles.head}>
            <div className={styles.icon}>
              <Icon name="pencil" size="24" />
            </div>
            <div className={styles.details}>
              <div className={styles.info}>Can not find</div>
              <div className={styles.text}>
                This Certificate does not exist in our Database
              </div>
            </div>
          </div>
          <button className={cn("button error", styles.button)}>Close</button>
        </div>
        
      </div>
      <div className={styles.note}>
        Something went wrong, please{" "}
        <a href="/#" target="_blank" rel="noopener noreferrer">
          try again or contact us
        </a>
      </div>
    </div>
  );
};

export default Status;
