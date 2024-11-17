// src/api.js
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

// Axios instance for API requests
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Root route (GET /)
export const getRoot = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching root:", error);
    throw error;
  }
};

// Get all NFTs (GET /nfts)
export const getAllNFTs = async () => {
  try {
    const response = await api.get("/nfts");
    return response.data;
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    throw error;
  }
};

// Get NFTs by address (GET /nfts/:address)
export const getNFTsByAddress = async (address) => {
  try {
    const response = await api.get(`/nfts/${address}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching NFTs for address ${address}:`, error);
    throw error;
  }
};

// Get NFT by address and ID (GET /nfts/:address/:id)
export const getNFTByAddressAndId = async (address, id) => {
  try {
    const response = await api.get(`/nfts/${address}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching NFT for address ${address} and ID ${id}:`,
      error
    );
    throw error;
  }
};

// Get NFT counter by address (GET /nfts/:address)
export const getNFTCounterByAddress = async (address) => {
  try {
    const response = await api.get(`/nfts/counters/${address}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching NFT counter for address ${address} :`, error);
    throw error;
  }
};

// Upload file to IPFS (POST /ipfs/upload-file)
export const uploadFileToIPFS = async (fileData, buffer) => {
  try {
    const formData = new FormData();
    formData.append("file", fileData);
    formData.append("buffer", buffer.toString("base64"));

    console.log(fileData);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await api.post("/ipfs/upload-file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    throw error;
  }
};

// Upload metadata to IPFS (POST /ipfs/upload-metadata)
export const uploadMetadataToIPFS = async (metadata) => {
  try {
    const response = await api.post("/ipfs/upload-metadata", metadata);
    return response.data;
  } catch (error) {
    console.error("Error uploading metadata to IPFS:", error);
    throw error;
  }
};

export const deployCertificateCollection = async (deployData) => {
  try {
    const response = await api.post("/contract/deploy", deployData);
    return response.data;
  } catch (error) {
    console.error("Error deploying certificate collection:", error);
    throw error;
  }
};

export const createNft = async (createNftData) => {
  try {
    const response = await api.post("/contract/create", createNftData);
    return response.data;
  } catch (error) {
    console.error("Error writing contract:", error);
    throw error;
  }
};

export default api;
