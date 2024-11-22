import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";
import { useLocation } from "react-router-dom";
import TextInput from "../../components/TextInput";
import Users from "./Users";
import Control from "./Control";
import { getNFTByAddressAndId, getVerifiersCertificate } from "../../apis/web3";

const initialUsers = [
  {
    name: "User 1",
    position: "Department of Student Affairs",
    avatar: "/images/content/avatar-graduate-lecturer.png",
    verified: false,
  },
  {
    name: "User 2",
    position: "Academic Affairs Office",
    avatar: "/images/content/avatar-graduate-lecturer.png",
    verified: false,
  },
  {
    name: "User 3",
    position: "University Youth Union",
    avatar: "/images/content/avatar-graduate-lecturer.png",
    verified: false,
  },
  {
    name: "User 4",
    position: "Faculty",
    avatar: "/images/content/avatar-graduate-lecturer.png",
    verified: false,
  },
  {
    name: "User 5",
    position: "University Presidency",
    avatar: "/images/content/avatar-graduate-lecturer.png",
    verified: false,
  },
];

const Item = () => {
  const [nftData, setNftData] = useState(null);
  const [editableAttributes, setEditableAttributes] = useState({});
  const [users, setUsers] = useState(initialUsers);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const address = queryParams.get("address");
  const tokenId = queryParams.get("tokenId");
  const privKey = localStorage.getItem("PRIVATEKEY");
  const verifyData = {
    contractAddress: address,
    id: tokenId,
    privateKey: privKey,
  };

  useEffect(() => {
    const fetchNFTData = async () => {
      try {
        const data = await getNFTByAddressAndId(address, tokenId);
        setNftData(data);

        const attributes = data.metadata.attributes.reduce((acc, attr) => {
          acc[attr.trait_type] = attr.value;
          return acc;
        }, {});
        setEditableAttributes(attributes);
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      }
    };

    fetchVerifiers();
    fetchNFTData();
  }, []);

  const fetchVerifiers = async () => {
    try {
      const data = await getVerifiersCertificate(address, tokenId);

      const verifiedCount = data.length;
      const updatedUsers = initialUsers.map((user, index) => ({
        ...user,
        verified: index < verifiedCount,
      }));
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error fetching verifiers:", error);
    }
  };

  const handleAttributeChange = (traitType, newValue) => {
    setEditableAttributes((prev) => ({
      ...prev,
      [traitType]: newValue,
    }));
  };

  if (!nftData) {
    return (
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <h2>Loading NFT Details...</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.bg}>
            <div className={styles.preview}>
              <img src={nftData.image_url} alt={nftData.token.name} />
            </div>
            <div className={styles.item}>
              <div className={styles.fieldset}>
                <h2 className={cn("h4", styles.title)}>Metadata Information</h2>
                <TextInput
                  className={styles.field}
                  label="Name"
                  value={nftData.token.name}
                  onChange={(e) =>
                    handleAttributeChange("Name", e.target.value)
                  }
                />
                {Object.entries(editableAttributes).map(
                  ([traitType, value]) => (
                    <TextInput
                      key={traitType}
                      className={styles.field}
                      label={traitType}
                      value={value}
                      onChange={(e) =>
                        handleAttributeChange(traitType, e.target.value)
                      }
                    />
                  )
                )}
              </div>
            </div>
          </div>
          <div className={styles.details}>
            <h1 className={cn("h3", styles.title)}>{nftData.metadata.name}</h1>
            <div className={styles.cost}>
              <div className={cn("status-stroke-green", styles.price)}>
                {editableAttributes["Student ID"]}
              </div>
              <div className={cn("status-stroke-black", styles.price)}>
                {editableAttributes["Activity Class"]}
              </div>
            </div>
            <div className={styles.info}>Students complete all credits</div>
            <Users className={styles.users} items={users} />
            <Control
              className={styles.control}
              verifyData={verifyData}
              fetchVerfier={fetchVerifiers}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
