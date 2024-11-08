import React, { useState, useRef, useEffect } from "react";
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
import CertificatePreview from "./Preview/CertificatePreview";
import Uploaded from "./Uploaded";
import {
  uploadFileToIPFS,
  uploadMetadataToIPFS,
  getAllNFTs,
} from "../../apis/web3";

const colorOptions = ["#4BC9F0", "#45B26B", "#EF466F", "#9757D7", "#F5A623"];

const Upload = () => {
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [formInputs, setFormInputs] = useState({});
  const [fileLoaded, setFileLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [buttonText, setButtonText] = useState("Create certificate");
  const [visibleUploaded, setVisibleUploaded] = useState(false);
  const [image, setImage] = useState();
  const [items, setItems] = useState([]);
  const certificateRef = useRef(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const results = await getAllNFTs();
        console.log(results.items);
        const items = results.items;
        const coloredItems = items.map((nft) => ({
          title: nft.name,
          color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
        }));
        setItems(coloredItems);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      }
    };

    fetchNFTs();
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

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

        
        await updateCertificateImage();
        console.log(image);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleInputChange = async (name, value) => {
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));

    await updateCertificateImage();
  };

  const updateCertificateImage = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current);
      const imageBlob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );
      setImage(imageBlob);
    }
  };
  const handleCaptureAndUpload = async () => {
    if (certificateRef.current) {
      try {
        setIsProcessing(true);
        setButtonText("Creating Certificate");

        await updateCertificateImage();

        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const file = new File([image], "certificate.png", {
          type: "image/png",
        });

        if (file) {
          const imageIpfsResult = await uploadFileToIPFS(file, buffer);

          const nftMetadata = {
            name: formInputs.studentName || "Certificate",
            description: "Certificate for academic achievements.",
            image: imageIpfsResult.url,
            attributes: [
              { trait_type: "Student ID", value: formInputs.studentID },
              { trait_type: "Activity Class", value: formInputs.activityClass },
              {
                trait_type: "Classification of Training",
                value: formInputs.classificationOfTraining,
              },
              { trait_type: "GPA", value: formInputs.gpa },
              { trait_type: "Date", value: formInputs.date },
            ],
          };

          const metadataIpfsResult = await uploadMetadataToIPFS(nftMetadata);

          console.log("Metadata uploaded to IPFS:", metadataIpfsResult);

          setIsProcessing(false);
          setVisibleUploaded(true);
          setButtonText("Create Degree");
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
                  className={cn("button", styles.button)}
                  onClick={handleCaptureAndUpload}
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
            image={image}
          />
        </div>
      </div>
      <Modal
        visible={visibleUploaded}
        onClose={() => {
          setVisibleUploaded(false);
          setIsProcessing(false);
        }}
      >
        <Uploaded className={styles.steps} formdata={formInputs} />
      </Modal>
    </>
  );
};

export default Upload;
