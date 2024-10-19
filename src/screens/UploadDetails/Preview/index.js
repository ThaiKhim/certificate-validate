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
        <div className={styles.info}>Xem trước</div>
        <div className={styles.card}>
          <div className={styles.preview}>
            <img
              srcSet="/images/content/card-pic-6.jpg"
              src="/images/content/card-pic-6@2x.jpg"
              alt="Card"
            />
          </div>
          <div className={styles.link}>
            <div className={styles.body}>
              <div className={styles.line}>
                <div className={styles.title}>Huỳnh Thái Khiêm</div>
                <div className={styles.price}>20IT911</div>
              </div>
              
            </div>
            <div className={styles.foot}>
              <div className={styles.status}>
                {/* <Icon name="candlesticks-up" size="20" /> */}
                Sinh viên <span>Giỏi</span>
              </div>
              <div className={styles.bid}>
                GPA: 9.9
                <span role="img" aria-label="fire">
                  🔥
                </span>
              </div>
            </div>
          </div>
        </div>
        <button className={styles.clear}>
          <Icon name="circle-close" size="24" />
          Xóa tất cả
        </button>
      </div>
    </div>
  );
};

export default Preview;
