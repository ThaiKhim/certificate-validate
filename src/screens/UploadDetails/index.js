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
import Deploy from "./Deploy";
import {
  uploadFileToIPFS,
  uploadMetadataToIPFS,
  getAllNFTs,
  getNFTTotalSupply,
  deployCertificateCollection,
  createNft,
} from "../../apis/web3";
import { CID } from "multiformats/cid";
import * as raw from "multiformats/codecs/raw";
import { sha256 } from "multiformats/hashes/sha2";
import { getStudentByStudentId } from "../../apis/cockroach";

const colorOptions = ["#4BC9F0", "#45B26B", "#EF466F", "#9757D7", "#F5A623"];

const Upload = () => {
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [formInputs, setFormInputs] = useState({});
  const [qrMetadataHash, setQrMetadataHash] = useState("");
  const [qrMetadata, setQrMetadata] = useState({});
  const [urls, setUrls] = useState({});
  const [fileLoaded, setFileLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [buttonText, setButtonText] = useState("Create certificate");
  const [visibleUploaded, setVisibleUploaded] = useState(false);
  const [visibleCreateCollection, setVisibleCreateCollection] = useState(false);
  const [image, setImage] = useState();
  const [items, setItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const certificateRef = useRef(null);

  useEffect(() => {
    fetchNFTs();
  }, []);

  const generateQrMetadataHash = async (metadata) => {
    try {
      const buffer = Buffer.from(JSON.stringify(metadata));
      const hash = await sha256.digest(buffer);

      const cid = CID.create(1, raw.code, hash);

      return cid.toString();
    } catch (error) {
      console.error("Error generating CID:", error);
      return null;
    }
  };

  const updateQrMetadataHash = async () => {
    if (selectedCard) {
      const total = await getNFTTotalSupply(selectedCard.address);

      const metadata = {
        name: formInputs.studentName || "Certificate",
        contract: selectedCard ? selectedCard.address : "",
        id: total + 1,
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

      const hash = await generateQrMetadataHash(metadata);
      console.log("hash= ", hash);

      setQrMetadataHash(hash);
      setQrMetadata(metadata);
    }
  };

  useEffect(() => {
    updateQrMetadataHash();
  }, [formInputs, selectedCard]);

  const fetchNFTs = async () => {
    const createCollectionCard = {
      title: "Create Collection",
      color: "#CCCCCC",
      isCreateNew: true,
    };

    try {
      const results = await getAllNFTs();
      const fetchedItems = results.items || [];

      const coloredItems =
        fetchedItems.length > 0
          ? fetchedItems.map((nft) => ({
              title: nft.name,
              color:
                colorOptions[Math.floor(Math.random() * colorOptions.length)],
              address: nft.address,
            }))
          : [];

      setItems([createCollectionCard, ...coloredItems]);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      setItems([createCollectionCard]);
    }
  };

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
          const imageIpfsResult = await uploadFileToIPFS(file, buffer);
          const student = await getStudentByStudentId(formInputs.studentID);

          const nftMetadata = {
            name: formInputs.studentName || "Certificate",
            description: "Certificate for academic achievements.",
            address: student.address,
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

          console.log(nftMetadata);

          const privKey = localStorage.getItem("PRIVATEKEY");
          const address = student.address;
          console.log(privKey);

          const total = await getNFTTotalSupply(selectedCard.address);

          const metadataIpfsResult = await uploadMetadataToIPFS(nftMetadata);
          const metadataQrResult = await uploadMetadataToIPFS(qrMetadata);

          const writeContractData = {
            contractAddress: selectedCard.address,
            methodArgs: [address, total + 1, metadataIpfsResult.cid],
            privateKey: privKey,
          };

          const createNftResult = await createNft(writeContractData);

          const urls = {
            ipfs: metadataIpfsResult.url,
            scan: createNftResult,
          };

          setUrls(urls);

          console.log("Metadata uploaded to IPFS:", metadataIpfsResult);

          setIsProcessing(false);
          setVisibleUploaded(true);
          setButtonText("Create Degree");
        }
      } catch (error) {
        console.error("Error capturing and uploading image:", error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleCardClick = (card) => {
    if (card.isCreateNew) {
      setVisibleCreateCollection(true);
    } else {
      setSelectedCard((prevCard) =>
        prevCard && prevCard.address === card.address ? null : card
      );
    }
  };

  const handleDeployCertificate = async (deployData) => {
    try {
      console.log(deployData);

      const response = await deployCertificateCollection(deployData);
      fetchNFTs();

      console.log("Deployment successful:", response);
    } catch (error) {}
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
                      <CertificatePreview
                        data={formInputs}
                        qrhash={qrMetadataHash}
                      />
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
                <Cards
                  className={styles.cards}
                  items={items}
                  onCardClick={handleCardClick}
                  selectedCard={selectedCard}
                />
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
        <Uploaded className={styles.steps} formdata={formInputs} urls={urls} />
      </Modal>
      <Modal
        visible={visibleCreateCollection}
        onClose={() => {
          setVisibleCreateCollection(false);
        }}
      >
        <Deploy
          className={styles.steps}
          onDeployCertificate={handleDeployCertificate}
          urls={urls}
        />
      </Modal>
    </>
  );
};

export default Upload;
