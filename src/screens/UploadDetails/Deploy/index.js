import React, { useState } from "react";
import cn from "classnames";
import styles from "./Deploy.module.sass";
import TextInput from "../../../components/TextInput";
import Loader from "../../../components/Loader";
import Icon from "../../../components/Icon";

const Deploy = ({ className, onDeployCertificate }) => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [buttonText, setButtonText] = useState("Deploy");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeploySuccess, setDeploySuccess] = useState(null);
  const [url, setUrl] = useState(null);

  const handleDeploy = async () => {
    try {
      const privKey = localStorage.getItem("PRIVATEKEY");

      const deployData = {
        certificateName: name,
        certificateSymbol: symbol,
        privateKey: privKey.toString(),
      };
      setIsProcessing(true);
      const url = await onDeployCertificate(deployData);
      setDeploySuccess(true);
      setUrl(url);
      setButtonText("Done");
    } catch (error) {
      console.error("Deployment failed:", error);
      setDeploySuccess(false);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={cn(className, styles.checkout)}>
      <div className={cn("h4", styles.title)}>
        Deploy Certificate Collection
      </div>
      {isDeploySuccess ? (
        <div>
          <div className={styles.iconCenter}>
            <Icon name="check"  size="64"  />
          </div>
          <div className={styles.head}>
            <div className={styles.details}>
              <div className={styles.info}>Deployed successfully</div>
              <div className={styles.text}>Link to certificate contractt</div>
            </div>
            <a
              className={styles.icon}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="arrow-expand" size="24" />
            </a>
          </div>
        </div>
      ) : (
        <>
          <TextInput
            className={styles.field}
            label={"Certificate Collection Name"}
            type="text"
            placeholder={"Certificate Collection Name"}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextInput
            className={styles.field}
            label={"Certificate Collection Symbol"}
            type="text"
            placeholder={"Certificate Collection Symbol"}
            onChange={(e) => setSymbol(e.target.value)}
            required
          />
        </>
      )}
      <div className={styles.btns}>
        <button className={cn("button", styles.button)} onClick={handleDeploy}>
          {isProcessing ? (
            <Loader className={styles.loader} />
          ) : (
            <span>{buttonText}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Deploy;
