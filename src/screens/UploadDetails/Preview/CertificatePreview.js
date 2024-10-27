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
        <h2 className={styles.certTitle}>Certificate of Achievement</h2>
        <p>This certifies that</p>
        <h1 className={styles.studentName}>{studentName}</h1>
        <p>
          Student ID: <strong className={styles.highlight}>{studentID}</strong>
        </p>
        <p>has completed the activity class:</p>
        <h3 className={styles.activityClass}>{activityClass}</h3>
        <p>
          Classification of Training:{" "}
          <strong className={styles.highlight}>
            {classificationOfTraining}
          </strong>
        </p>
        <p>
          GPA: <strong className={styles.highlight}>{gpa}</strong>
        </p>
        <p>Date: {date}</p>
        <div className={styles.signature}>Signature</div>
      </div>
    </div>
  );
};

export default CertificatePreview;
