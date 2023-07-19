import { API_BASE } from "../config";
import API from "../instance";


export function getCategoryById(endpoint) {
    return API.get(`${API_BASE}/${endpoint}`, null);
}

export function getAllCategory(endpoint) {
    return API.get(`${API_BASE}/${endpoint}`, null);
}
export function updateCategory(endpoint, body) {
    return API.put(`${API_BASE}/${endpoint}`, body);
}
export function createCategory(endpoint, body) {
    return API.post(`${API_BASE}/${endpoint}`, body);
}
export function deleteCategoryById(endpoint, body) {
    return API.delete(`${API_BASE}/${endpoint}`, body);
}
