import React from "react";
import styles from "./CertificatePreview.module.sass";
import Image from "../../../components/Image";
import { QRCodeCanvas } from "qrcode.react";

const CertificatePreview = ({ data, qrhash }) => {
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
        <div className={styles.header}>
          <Image className={styles.logoimg} src="/images/Logo_VKU.png" />

          <div className={styles.universityInfo}>
            <h3 className={styles.universityName}>
              VIETNAM-KOREA UNIVERSITY OF INFORMATION AND COMMUNICATION
              TECHNOLOGY
            </h3>
            <p>470 Tran Dai Nghia, Ngu Hanh Son, Da Nang</p>
          </div>
        </div>

        <h2 className={styles.studentLabel}>Student</h2>
        <p>This certificate of recognition is hereby awarded to</p>
        <h1 className={styles.studentName}>{studentName}</h1>
        <p>
          has successfully completed the requirements for the degree of Bachelor
          of Science in Computer Science and is hereby awarded this certificate.
        </p>
        <p>Given on the {date}.</p>

        <div className={styles.signatureContainer}>
          <p className={styles.signatureLine}></p>
          <p className={styles.signature}>Huynh Cong Phap</p>
          <p className={styles.signatureTitle}>UNIVERSITY PRESIDENT</p>
        </div>
        <div className={styles.qrCode}>
          <QRCodeCanvas value={qrhash} size={90} />
        </div>
      </div>
    </div>
  );
};

export default CertificatePreview;
