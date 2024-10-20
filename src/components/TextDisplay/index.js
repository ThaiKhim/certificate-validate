import React from "react";
import cn from "classnames";
import styles from "./TextDisplay.module.sass";

const TextDisplay = ({ className, label, value }) => {
  return (
    <div className={cn(styles.field, className)}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.wrap}>
        <div className={styles.display}>{value}</div>
      </div>
    </div>
  );
};

export default TextDisplay;

