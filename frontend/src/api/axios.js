import axios from "axios";

const baserRoute="customer-support";
const baseURL = `http://localhost:5000/${baserRoute}`;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, 

  headers: {
    "Content-Type": "application/json",
  },
});
const formDataAxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data', 
  },
});

export { axiosInstance, formDataAxiosInstance };