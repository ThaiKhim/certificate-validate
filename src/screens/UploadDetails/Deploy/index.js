import React from "react";
import cn from "classnames";
import styles from "./Deploy.module.sass";
import TextInput from "../../../components/TextInput";
import Icon from "../../../components/Icon";

const Deploy = ({ className, formdata, urls }) => {
  return (
    <div className={cn(className, styles.checkout)}>
      <div className={cn("h4", styles.title)}>
        Deploy Certificate Collection
      </div>
      <TextInput
        className={styles.field}
        label={"Certificate Collection Name"}
        type="text"
        placeholder={"Certificate Collection Name"}
        required
      />
      <TextInput
        className={styles.field}
        label={"Certificate Collection Symbol"}
        type="text"
        placeholder={"Certificate Collection Symbol"}
        required
      />
      <div className={styles.btns}>
        <button className={cn("button", styles.button)}>
          Deploy Certificate
        </button>
      </div>
    </div>
  );
};

export default Deploy;
