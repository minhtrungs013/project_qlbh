import { API_BASE } from "../config";
import API from "../instance";


export function getUserById(endpoint) {
    return API.get(`${API_BASE}/${endpoint}`, null);
}

export function getUser(endpoint) {
    return API.get(`${API_BASE}/${endpoint}`);
}

export function getAllUser(endpoint) {
    return API.get(`${API_BASE}/${endpoint}`, null);
}

export function updateUser(endpoint, body) {
    return API.put(`${API_BASE}/${endpoint}`, body);
}

