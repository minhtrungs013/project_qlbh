import { API_BASE } from "../config";
import API from "../instance";


export function getUserById(endpoint) {
    return API.get(`${API_BASE}/${endpoint}`, null);
}

export function getAllUser(endpoint) {
    return API.get(`${API_BASE}/${endpoint}`, null);
}
export function updateUser(endpoint, body) {
    return API.put(`${API_BASE}/${endpoint}`, body);
}
export function followUser(endpoint, body) {
    return API.put(`${API_BASE}/${endpoint}`, body);
}
export function unfollowUser(endpoint, body) {
    return API.put(`${API_BASE}/${endpoint}`, body);
}
