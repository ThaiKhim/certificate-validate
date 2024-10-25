import React from "react";
import styles from "./CertificatePreview.module.sass";

const CertificatePreview = ({ data }) => {
  const {
    studentName,
    studentID,
    activityClass,
    classificationOfTraining,
    gpa,
    date,
  } = data;

  return (
    <div className={styles.previewContainer}>
      <div className={styles.certificate}>
        <h2>Certificate of Achievement</h2>
        <p>This certifies that</p>
        <h1>{studentName}</h1>
        <p>
          Student ID: <strong>{studentID}</strong>
        </p>
        <p>has completed the activity class:</p>
        <h3>{activityClass}</h3>
        <p>
          Classification of Training:{" "}
          <strong>{classificationOfTraining}</strong>
        </p>
        <p>
          GPA: <strong>{gpa}</strong>
        </p>
        <p>Date: {date}</p>
        <div className={styles.signature}>Signature</div>
      </div>
    </div>
  );
};

export default CertificatePreview;
