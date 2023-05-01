import React, { useState } from "react";
import cn from "classnames";
import styles from "./UploadDetails.module.sass";
import Icon from "../../components/Icon";
import TextInput from "../../components/TextInput";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import Preview from "./Preview";
import Uploaded from "./Uploaded";
import FolowSteps from "./FolowSteps";
import {
  uploadFileToIPFS,
  uploadJSONToIPFS,
} from "../../components/Blockchain/IPFSHandler";

const Upload = () => {
  const [visibleModal, setVisibleModal] = useState(false);

  const [visiblePreview, setVisiblePreview] = useState(false);

  const [visibleUploaded, setVisibleUploaded] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const [formParams, setFormParams] = useState({
    type: "",
    name: "",
    studentid: "",
    fileURL: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const [buttonText, setButtonText] = useState("Create Degree");

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTypeChange = (event) => {
    setFormParams({ ...formParams, type: event.target.value });
  };

  const handleNameChange = (event) => {
    setFormParams({ ...formParams, name: event.target.value });
  };

  const handlestudentidChange = (event) => {
    setFormParams({ ...formParams, studentid: event.target.value });
  };

  const handleCreateDegree = async () => {
    try {
      setIsProcessing(true);
      setButtonText("Creating Degree");
      // Upload the file to IPFS
      const file = selectedFile;
      const responseFile = await uploadFileToIPFS(file);
      if (responseFile.success === true) {
        const fileURL = responseFile.pinataURL;
        setFormParams({ ...formParams, fileURL });

        // Upload the metadata to IPFS
        const { type, name, studentid, price } = formParams;
        const nftJSON = { type, name, studentid, price, image: fileURL };
        const responseMetadata = await uploadJSONToIPFS(nftJSON);
        if (responseMetadata.success === true) {
          console.log(
            "Uploaded metadata to Pinata: ",
            responseMetadata.pinataURL
          );
        }
      }
      setIsProcessing(false);
      setVisibleUploaded(true);
      setButtonText("Create Degree");
    } catch (e) {
      console.log("Error during file upload", e);
      setIsProcessing(false);
      setButtonText("Create Degree");
    }
  };

  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.wrapper}>
            <div className={styles.head}>
              <div className={cn("h2", styles.title)}>Create Degree</div>
            </div>
            <form className={styles.form} action="">
              <div className={styles.list}>
                <div className={styles.item}>
                  <div className={styles.category}>Upload Degree</div>
                  <div className={styles.note}>
                    Drag or choose your file to upload
                  </div>
                  <div className={styles.file}>
                    <input
                      className={styles.load}
                      type="file"
                      onChange={handleFileSelect}
                    />
                    <label htmlFor="file-input">
                      {selectedFile ? (
                        <img
                          className={styles.image}
                          src={URL.createObjectURL(selectedFile)}
                          alt="Selected"
                        />
                      ) : (
                        <>
                          <div className={styles.icon}>
                            <Icon name="upload-file" size="24" />
                          </div>
                          <div className={styles.format}>
                            PNG, PDF, JPG Max 1Gb.
                          </div>
                        </>
                      )}
                    </label>
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.category}>Item Details</div>
                  <div className={styles.fieldset}>
                    <TextInput
                      className={styles.field}
                      label="Type name"
                      name="Item"
                      type="text"
                      placeholder="e. g. “The University Certificate”"
                      required
                      onChange={handleTypeChange}
                    />
                    <TextInput
                      className={styles.field}
                      label="Student name"
                      name="Item"
                      type="text"
                      placeholder="e. g. “Ho Ngoc Tam”"
                      required
                      onChange={handleNameChange}
                    />
                    <TextInput
                      className={styles.field}
                      label="StudentID"
                      name="StudentID"
                      type="text"
                      placeholder="e. g. “20IT971”"
                      required
                      onChange={handlestudentidChange}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.foot}>
                <button
                  className={cn("button-stroke tablet-show", styles.button)}
                  onClick={() => setVisiblePreview(true)}
                  type="button"
                >
                  Preview
                </button>
                <button
                  className={cn("button", styles.button)}
                  onClick={handleCreateDegree}
                  // type="button" hide after form customization
                  type="button"
                  disabled={isProcessing}
                >
                  <span>{buttonText}</span>
                  {isProcessing ? (
                    <Loader className={styles.loader} />
                  ) : (
                    <Icon name="arrow-next" size="10" />
                  )}
                </button>
                <div className={styles.saving}>
                  <span>Auto saving</span>
                  <Loader className={styles.loader} />
                </div>
              </div>
            </form>
          </div>
          <Preview
            className={cn(styles.preview, { [styles.active]: visiblePreview })}
            onClose={() => setVisiblePreview(false)}
            img={selectedFile}
            formdata={formParams}
          />
          <Uploaded
            className={cn(styles.uploaded, {
              [styles.active]: visibleUploaded,
            })}
            onClose={() => setVisibleUploaded(false)}
            img={selectedFile}
            formdata={formParams}
          />
        </div>
      </div>
      <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <FolowSteps className={styles.steps} />
      </Modal>
    </>
  );
};

export default Upload;
