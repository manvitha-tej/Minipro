import axios from "axios";

// ✅ Set the backend base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// You can use this format for every API request
export default API;
