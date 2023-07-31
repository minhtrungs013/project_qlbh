import { API_BASE } from "../../config";
import API from "../../instance";


export function getDataById(endpoint) {
    return API.get(`${API_BASE}/${endpoint}`, null);
}
export function getAllData(endpoint) {
    return API.get(`${API_BASE}/${endpoint}`, null);
}
export function updateData(endpoint, body) {
    return API.put(`${API_BASE}/${endpoint}`, body);
}
export function createData(endpoint, body) {
    return API.post(`${API_BASE}/${endpoint}`, body);
}
export function deleteDataById(endpoint, body) {
    return API.delete(`${API_BASE}/${endpoint}`, body);
}
