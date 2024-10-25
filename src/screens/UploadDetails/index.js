import React, { useState } from "react";
import * as XLSX from "xlsx";
import cn from "classnames";
import styles from "./UploadDetails.module.sass";
import Icon from "../../components/Icon";
import TextInput from "../../components/TextInput";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import Preview from "./Preview";
import Cards from "./Cards";
import FolowSteps from "./FolowSteps";
import CertificatePreview from "./Preview/CertificatePreview";

const items = [
  {
    title: "Create collection",
    color: "#4BC9F0",
  },
  {
    title: "Class of 20",
    color: "#45B26B",
  },
  {
    title: "Class of 21",
    color: "#EF466F",
  },
  {
    title: "Class of 22",
    color: "#9757D7",
  },
  {
    title: "Class of 23",
    color: "#9757D7",
  },
];

const Upload = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [certificateData, setCertificateData] = useState(null);
  const [fileLoaded, setFileLoaded] = useState(false);

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
        setColumnNames(Object.keys(jsonData[0] || {}));
        setFileLoaded(true);

        if (jsonData.length > 0) {
          const firstRow = jsonData[0];
          console.log(firstRow);

          setCertificateData({
            studentName: firstRow["Student’s Name"] || "",
            studentID: firstRow["Student’s ID"] || "",
            activityClass: firstRow["Activity class"] || "",
            classificationOfTraining:
              firstRow["Classification of Training"] || "",
            gpa: firstRow["GPA"] || "",
            date: new Date().toLocaleDateString(),
          });
        }
      };

      reader.readAsArrayBuffer(file);
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
                    <div className={styles.certificatePreview}>
                      <CertificatePreview data={certificateData} />
                    </div>
                  )}
                </div>
                <div className={styles.item}>
                  <div className={styles.category}>Student's information</div>
                  <div className={styles.fieldset}>
                    {excelData.map((row, rowIndex) => (
                      <div key={rowIndex} className={styles.row.m}>
                        {columnNames.map((columnName) => (
                          <TextInput
                            key={columnName}
                            className={styles.field}
                            label={columnName}
                            name={`${columnName}-${rowIndex}`}
                            type="text"
                            placeholder={`Insert ${columnName}`}
                            value={row[columnName] || ""}
                            required
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.options}>
                <div className={styles.category}>Create collection</div>
                <div className={styles.text}>
                  Choose an exiting collection or create a new one
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
                  onClick={() => setVisibleModal(true)}
                  type="button"
                >
                  <span>Create certificate</span>
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
