import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api", // or your FastAPI backend URL
});

export const loginUser = (formData) => API.post("/login", formData);
export const registerUser = (data) => API.post("/register", data);
