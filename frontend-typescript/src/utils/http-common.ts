import axios from 'axios';

export default axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  // baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  }
});
