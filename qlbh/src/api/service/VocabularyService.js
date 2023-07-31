import { API_BASE } from "../config";
import API from "../instance";


export function getAllVocabulary(endpoint) {
    return API.get(`${API_BASE}/${endpoint}`, null);
}

export function getVocabylaryByCategoryId(endpoint) {
    return API.get(`${API_BASE}/${endpoint}`, null);
}
export function updateProduct(endpoint, body) {
    return API.put(`${API_BASE}/${endpoint}`, body);
}
export function createProduct(endpoint, body) {
    return API.post(`${API_BASE}/${endpoint}`, body);
}
export function deleteProductById(endpoint, body) {
    return API.delete(`${API_BASE}/${endpoint}`, body);
}
