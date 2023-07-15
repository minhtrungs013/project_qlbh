import axios from "axios";
const API = axios.create();

API.interceptors.request.use((request) => {
  // add auth header with jwt if local storage exist token
  const token = localStorage.getItem("token");
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
});
// const API = axios.create({ baseURL: 'http://localhost:5000' });
// API.interceptors.request.use((request) => {
//     request.withCredentials = true;
//       return request;
//     });

export default API;