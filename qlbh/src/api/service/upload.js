import { API_BASE } from "../config";
import API from "../instance";


export function upload(endpoint,body, config) {
    return API.post(`${API_BASE}/${endpoint}`, body, config);
}