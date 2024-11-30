import React, { useState } from "react";
import cn from "classnames";
import styles from "./VerifyCredentials.module.sass";
import Icon from "../../components/Icon";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import Status from "./Status";
import jsQR from "jsqr";
import { validateCertificate } from "../../apis/web3";

const Verify = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validateResult, setValidateResult] = useState(null);
  const [buttonText, setButtonText] = useState("Validate");

  const handleFileSelect = (event) => {
    if (event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const scanQRCode = async (file) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    return new Promise((resolve, reject) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
          resolve(code.data);
        } else {
          reject("No QR code found in the image.");
        }
      };

      img.onerror = () => {
        reject("Error loading image for QR scanning.");
      };
    });
  };

  const handleValidate = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please upload a file before validating.");
      return;
    }

    try {
      setIsProcessing(true);
      setButtonText("Validating");

      const qrData = await scanQRCode(selectedFile);

      const ValidateResult = await validateCertificate(qrData);

      setValidateResult(ValidateResult);
      setVisibleModal(true);
    } catch (error) {
      console.error("Error validating the file or scanning QR:", error);
      alert(error);
    } finally {
      setIsProcessing(false);
      setButtonText("Validate");
    }
  };

  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.wrapper}>
            <div className={styles.head}>
              <div className={cn("h2", styles.title)}>Verify Credentials</div>
            </div>
            <form className={styles.form} onSubmit={handleValidate}>
              <div className={styles.list}>
                <div className={styles.item}>
                  <div className={styles.category}>Upload file</div>
                  <div className={styles.note}>
                    Drag or choose your file to upload
                  </div>
                  {selectedFile ? (
                    <img
                      className={styles.image}
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected"
                      onLoad={() => URL.revokeObjectURL(selectedFile)}
                    />
                  ) : (
                    <div className={styles.file}>
                      <input
                        id="file-input"
                        className={styles.load}
                        type="file"
                        accept=".png,.jpg,.jpeg,.pdf"
                        onChange={handleFileSelect}
                      />
                      <label htmlFor="file-input">
                        <div className={styles.icon}>
                          <Icon name="upload-file" size="24" />
                        </div>
                        <div className={styles.format}>
                          PNG, PDF, JPG Max 1Gb.
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.foot}>
                <button
                  className={cn("button", styles.button)}
                  type="submit"
                  disabled={isProcessing || !selectedFile}
                >
                  <span>{buttonText}</span>
                  {isProcessing && <Loader className={styles.loader} />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <Status className={styles.steps} isCertificateValid={validateResult} />
      </Modal>
    </>
  );
};

export default Verify;
