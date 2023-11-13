import { API_BASE } from "../config";
import axios from "axios";
import API from "../instance";

export function loginAPI(endpoint, body) {
    return axios.post(`${API_BASE}/${endpoint}`, body);
}

export function registerAPI(endpoint, body) {
    return axios.post(`${API_BASE}/${endpoint}`, body);
}

export function changePasswordAPI(endpoint, body) {
    return API.put(`${API_BASE}/${endpoint}`, body);
}