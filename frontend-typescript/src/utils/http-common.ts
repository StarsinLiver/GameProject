import axios from "axios";

export default axios.create({
  // baseURL: "http://43.201.18.3:8000/api",
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  }
});
