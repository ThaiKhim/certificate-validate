import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import cn from "classnames";
import html2canvas from "html2canvas";
import styles from "./UploadDetails.module.sass";
import Icon from "../../components/Icon";
import TextInput from "../../components/TextInput";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import Preview from "./Preview";
import Cards from "./Cards";
import FolowSteps from "./FolowSteps";
import CertificatePreview from "./Preview/CertificatePreview";
import { uploadFileToIPFS } from "../../apis/web3";

const items = [
  { title: "Create collection", color: "#4BC9F0" },
  { title: "Class of 20", color: "#45B26B" },
  { title: "Class of 21", color: "#EF466F" },
  { title: "Class of 22", color: "#9757D7" },
  { title: "Class of 23", color: "#9757D7" },
];

const Upload = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [formInputs, setFormInputs] = useState({});
  const [fileLoaded, setFileLoaded] = useState(false);
  const certificateRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        console.log(jsonData);
        setExcelData(jsonData);
        setFileLoaded(true);

        if (jsonData.length > 0) {
          const firstRow = jsonData[0];
          const dynamicFormInputs = {
            studentName: firstRow["Student’s Name"] || "",
            studentID: firstRow["Student’s ID"] || "",
            activityClass: firstRow["Activity class"] || "",
            classificationOfTraining:
              firstRow["Classification of Training"] || "",
            gpa: firstRow["GPA"] || "",
            date: new Date().toLocaleDateString(),
          };
          setFormInputs(dynamicFormInputs);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleInputChange = (name, value) => {
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleCaptureAndUpload = async () => {
    if (certificateRef.current) {
      try {
        const canvas = await html2canvas(certificateRef.current);
        const imageBlob = await new Promise((resolve) =>
          canvas.toBlob(resolve, "image/png")
        );

        const arrayBuffer = await imageBlob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const file = new File([imageBlob], "certificate.png", {
          type: "image/png",
        });

        if (file) {
          console.log(file);

          const ipfsResult = await uploadFileToIPFS(file, buffer);
          console.log("Uploaded to IPFS:", ipfsResult);
        }
      } catch (error) {
        console.error("Error capturing and uploading image:", error);
      }
    }
  };

  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.wrapper}>
            <div className={styles.head}>
              <div className={cn("h2", styles.title)}>
                Create single certificate
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
                  {!fileLoaded ? (
                    <div className={styles.file}>
                      <input
                        className={styles.load}
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileChange}
                      />
                      <div className={styles.icon}>
                        <Icon name="upload-file" size="24" />
                      </div>
                      <div className={styles.format}>Only excel accepted.</div>
                    </div>
                  ) : (
                    <div
                      className={styles.certificatePreview}
                      ref={certificateRef}
                    >
                      <CertificatePreview data={formInputs} />
                    </div>
                  )}
                </div>
                <div className={styles.item}>
                  <div className={styles.category}>Student's information</div>
                  <div className={styles.fieldset}>
                    {Object.keys(formInputs).map((key) => (
                      <TextInput
                        key={key}
                        className={styles.field}
                        label={key}
                        name={key}
                        type="text"
                        placeholder={`Insert ${key}`}
                        value={formInputs[key]}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        required
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.options}>
                <div className={styles.category}>Create collection</div>
                <div className={styles.text}>
                  Choose an existing collection or create a new one
                </div>
                <Cards className={styles.cards} items={items} />
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
                  onClick={handleCaptureAndUpload}
                  type="button"
                >
                  <span>Create & Upload Certificate</span>
                  <Icon name="arrow-next" size="10" />
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
