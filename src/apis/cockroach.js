import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

// Axios instance for API requests
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Admin APIs

// Create a new admin (POST /admins)
export const createAdmin = async (adminData) => {
  try {
    const response = await api.post("/admins", adminData);
    return response.data;
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
};

// Get all admins (GET /admins)
export const getAllAdmins = async () => {
  try {
    const response = await api.get("/admins");
    return response.data;
  } catch (error) {
    console.error("Error fetching admins:", error);
    throw error;
  }
};

// Get admin by ID (GET /admins/:id)
export const getAdminById = async (id) => {
  try {
    const response = await api.get(`/admins/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching admin with ID ${id}:`, error);
    throw error;
  }
};

// Get admin by email (GET /admins/:email)
export const getAdminByEmail = async (email) => {
  try {
    const response = await api.get(`/admins/email/${email}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching admin with email ${email}:`, error);
    throw error;
  }
};

// Update admin by ID (PUT /admins/:id)
export const updateAdminById = async (id, adminData) => {
  try {
    const response = await api.put(`/admins/${id}`, adminData);
    return response.data;
  } catch (error) {
    console.error(`Error updating admin with ID ${id}:`, error);
    throw error;
  }
};

// Update admin address by email (PUT /admins/update-address/:email)
export const updateAdminAddressByEmail = async (email, newAddress) => {
  try {
    const response = await api.put(`/admins/update-address/${email}`, {
      address: newAddress,
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error updating address for admin with email ${email}:`,
      error
    );
    throw error;
  }
};

// Delete admin by ID (DELETE /admins/:id)
export const deleteAdminById = async (id) => {
  try {
    await api.delete(`/admins/${id}`);
  } catch (error) {
    console.error(`Error deleting admin with ID ${id}:`, error);
    throw error;
  }
};

// Student APIs

// Update student address by email (PUT /students/update-address/:email)
export const updateStudentAddressByEmail = async (email, newAddress) => {
  try {
    const response = await api.put(`/students/update-address/${email}`, {
      address: newAddress,
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error updating address for student with email ${email}:`,
      error
    );
    throw error;
  }
};

// Get student by student ID (GET /students/:studentId)
export const getStudentByStudentId = async (studentId) => {
  try {
    const response = await api.get(`/students/${studentId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching student with ID ${studentId}:`, error);
    throw error;
  }
};

export default api;
