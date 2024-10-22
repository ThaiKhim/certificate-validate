import React from "react";
import styles from "./VerifyStatus.module.sass";

const VerifyStatus = ({ verified }) => {
  return (
    <div className={`${styles.verifyStatus} ${verified ? styles.verified : ""}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={verified ? "#4CAF50" : "#BDBDBD"} // Icon color based on verification
        className={styles.icon}
        width="24px"
        height="24px"
      >
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.707 9.293-6 6a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414L11 13.586l5.293-5.293a1 1 0 0 1 1.414 1.414z" />
      </svg>
    </div>
  );
};

export default VerifyStatus;