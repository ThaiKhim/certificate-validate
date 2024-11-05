import React from "react";
import cn from "classnames";
import styles from "./Uploaded.module.sass";
import Icon from "../../../components/Icon";

const Uploaded = ({ className, onClose, img, formdata }) => {
  return (
    <div className={cn(className, styles.wrap)}>
      <div className={styles.inner}>
        <button className={styles.close} onClick={onClose}>
          <Icon name="close" size="14" />
        </button>
        <div className={styles.info} style={{ textAlign: "center" }}>
          Create Degree Compelted
        </div>
        <div className={styles.card}>
          <div className={styles.preview}>
            {img ? (
              <img
                className={styles.image}
                src={URL.createObjectURL(img)}
                alt="Selected"
              />
            ) : (
              <>
                <div className={styles.icon}>
                  <Icon name="upload-file" size="24" />
                </div>
              </>
            )}
          </div>
          <div className={styles.link}>
            <div className={styles.body}>
              <div className={styles.line}>
                {formdata.type ? (
                  <div className={styles.title}>{formdata.type}</div>
                ) : (
                  <>
                    <div className={styles.title}>Type of Degree</div>
                  </>
                )}
              </div>
            </div>
            <div className={styles.foot}>
              <div className={styles.status}>
                <Icon name="user" size="20" />
                {formdata.studentName ? (
                  <span>{formdata.studentName}</span>
                ) : (
                  <>
                    <span>Student Name</span>
                  </>
                )}
              </div>
              <div className={styles.bid}>
                {formdata.studentID ? formdata.studentID : <>ID</>}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.checkWrap}>
          <img className={styles.check} src="/images/Check.gif" alt="check" />
        </div>
      </div>
    </div>
  );
};

export default Uploaded;
