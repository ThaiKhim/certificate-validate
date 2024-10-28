import React from "react";
import cn from "classnames";
import styles from "./Preview.module.sass";
import Icon from "../../../components/Icon";

const Preview = ({ className, onClose }) => {
  return (
    <div className={cn(className, styles.wrap)}>
      <div className={styles.inner}>
        <button className={styles.close} onClick={onClose}>
          <Icon name="close" size="14" />
        </button>
        <div className={styles.info}>Preview</div>
        <div className={styles.card}>
          <div className={styles.preview}>
            <img
              srcSet="/images/certificate/huynh-thai-khiem.png"
              src="/images/certificate/huynh-thai-khiem.png"
              alt="Card"
            />
          </div>
          <div className={styles.link}>
            <div className={styles.body}>
              <div className={styles.line}>
                <div className={styles.title}>Huynh Thai Khiem</div>
                <div className={styles.price}>20IT911</div>
              </div>
              
            </div>
            <div className={styles.foot}>
              <div className={styles.status}>
                {/* <Icon name="candlesticks-up" size="20" /> */}
                Student <span>Good</span>
              </div>
              <div className={styles.bid}>
                GPA: 3.4
                <span role="img" aria-label="fire">
                  🔥
                </span>
              </div>
            </div>
          </div>
        </div>
        <button className={styles.clear}>
          <Icon name="circle-close" size="24" />
          Clear all
        </button>
      </div>
    </div>
  );
};

export default Preview;
