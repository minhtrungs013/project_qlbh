import { API_BASE } from "../config";
import API from "../instance";
import axios from "axios";

export function loginAPI(endpoint, body) {
    return axios.post(`${API_BASE}/${endpoint}`, body);
}

export function registerAPI(endpoint, body) {
    return axios.post(`${API_BASE}/${endpoint}`, body);
}

export function getAccountByUsernameAPI(endpoint) {
    return API.get(`${API_BASE}/${endpoint}`);
}

export function changePasswordAPI(endpoint, body) {
    return API.put(`${API_BASE}/${endpoint}`, body);
}