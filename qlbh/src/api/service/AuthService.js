import { API_BASE } from "../config";
import API from "../instance";


export function loginAPI(endpoint, body) {
    return API.post(`${API_BASE}/${endpoint}`, body);
}

export function registerAPI(endpoint, body) {
    return API.post(`${API_BASE}/${endpoint}`, body);
}

