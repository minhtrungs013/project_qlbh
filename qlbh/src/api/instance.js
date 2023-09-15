import axios from "axios";

const API = axios.create();
const token = localStorage.getItem('token')
API.interceptors.request.use((request) => {
  request.withCredentials = true;
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
});

export default API;