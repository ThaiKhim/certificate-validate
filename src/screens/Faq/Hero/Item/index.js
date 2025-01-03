import React, { useState } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";

const Preview = ({ className, item }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={cn(className, styles.item, { [styles.active]: visible })}>
      <div className={styles.head} onClick={() => setVisible(!visible)}>
        {item}
      </div>
      <div className={styles.body}>
        <div className={styles.content}>
        Blockchain diploma verification is a method of authenticating educational credentials using blockchain technology. It ensures the document's integrity, authenticity, and security.{" "}
        </div>
        <button className={cn("button-stroke button-small", styles.button)}>
          Learn more
        </button>
      </div>
    </div>
  );
};

export default Preview;