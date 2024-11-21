import React, { useState } from "react";
import cn from "classnames";
import styles from "./UploadDetails.module.sass";
import Icon from "../../components/Icon";
import TextInput from "../../components/TextInput";
import Modal from "../../components/Modal";
import Status from "./Status";




const Verify = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.wrapper}>
            <div className={styles.head}>
              <div className={cn("h2", styles.title)}>
              Verify Credentials
              </div>
              <button
                className={cn("button-stroke button-small", styles.button)}
              >
                Switch to Multiple
              </button>
            </div>
            <form className={styles.form} action="">
              <div className={styles.list}>
                <div className={styles.item}>
                  <div className={styles.category}>Upload file</div>
                  <div className={styles.note}>
                    Drag or choose your file to upload
                  </div>
                  <div className={styles.file}>
                    <input className={styles.load} type="file" />
                    <div className={styles.icon}>
                      <Icon name="upload-file" size="24" />
                    </div>
                    <div className={styles.format}>
                      PNG, GIF, WEBP, MP4 or MP3. Max 1Gb.
                    </div>
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.category}>Item Details</div>
                  <div className={styles.fieldset}>
                    <TextInput
                      className={styles.field}
                      label="Student's Name"
                      name="Student's Name"
                      type="text"
                      placeholder="Student's name will be showed here"
                      required
                    />
                    <TextInput
                      className={styles.field}
                      label="Student's ID"
                      name="Student's ID"
                      type="text"
                      placeholder="Student's ID will be showed here"
                      required
                    />
                    <div className={styles.row}>
                      <div className={styles.col}>
                          <TextInput
                            className={styles.field}
                            label="Class"
                            name="Class"
                            type="text"
                            placeholder="e. g. Class"
                            required
                          />
                        </div>
                      <div className={styles.col}>
                        <TextInput
                          className={styles.field}
                          label="Classification of Training"
                          name="Classification of Training"
                          type="text"
                          placeholder="e. g. Good"
                          required
                        />
                      </div>
                      <div className={styles.col}>
                        <TextInput
                          className={styles.field}
                          label="GPA"
                          name="GPA"
                          type="text"
                          placeholder="e. g. GPA"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.foot}>
                
                <button
                  className={cn("button", styles.button)}
                  onClick={() => setVisibleModal(true)}
                  // type="button" hide after form customization
                  type="button"
                >
                  <span>Verify</span>
                  <Icon name="arrow-next" size="10" />
                </button>
                
              </div>
            </form>
          </div>
          
        </div>
      </div>
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <Status className={styles.steps} />
      </Modal>
    </>
  );
};

export default Verify;
