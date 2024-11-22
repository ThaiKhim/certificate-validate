import React, { useState } from "react";
import cn from "classnames";
import styles from "./Control.module.sass";
import Verify from "./Verify";
import Modal from "../../../components/Modal";
import Loader from "../../../components/Loader";
import { verifyCertificate } from "../../../apis/web3";

const Control = ({ className, verifyData, fetchVerfier }) => {
  const [visibleModalVerify, setVisibleModalVerify] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [txhash, setTxhash] = useState("");
  const [buttonText, setButtonText] = useState("Verify");

  const handleVerify = async () => {
    try {
      setIsProcessing(true);
      setButtonText("Verifying...");
      const url = await verifyCertificate(verifyData);
      setTxhash(url);
      setButtonText("Verified");
      setVisibleModalVerify(true);

      fetchVerfier();
    } catch (error) {
      console.error("Verification failed:", error);
      setButtonText("Verify");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className={cn(styles.control, className)}>
        <div className={styles.head}>
          <div className={styles.avatar}>
            <img
              src="/images/content/avatar-graduate-student.png"
              alt="Avatar"
            />
          </div>
          <div className={styles.details}>
            <div className={styles.info}>
              Approval <span>University Diploma</span>
            </div>
            <div className={styles.cost}>
              <div className={styles.price}>Huynh Thai Khiem</div>
            </div>
          </div>
        </div>
        <div className={cn(styles.btns, styles["single-btn"])}>
          <button
            className={cn("button", styles.button)}
            onClick={handleVerify}
            type="button"
            disabled={isProcessing}
          >
            <span>{buttonText}</span>
            {isProcessing && <Loader className={styles.loader} />}
          </button>
        </div>
      </div>
      <Modal
        visible={visibleModalVerify}
        onClose={() => setVisibleModalVerify(false)}
      >
        <Verify txhash={txhash} />
      </Modal>
    </>
  );
};

export default Control;
