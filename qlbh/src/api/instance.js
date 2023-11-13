import axios from "axios";

const API = axios.create();
API.interceptors.request.use(
  function (config) {
    let token = getToken();
    if (!token) return config;
    config.headers['Authorization'] = 'Bearer ' + getToken();

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default API;


export function getToken() {
  return localStorage.getItem('token');
}