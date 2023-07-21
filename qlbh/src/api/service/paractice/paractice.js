import { API_BASE } from "../../config";
import API from "../../instance";


export function getAllPracticesWithoutParts(endpoint) {
    return API.get(`${API_BASE}/${endpoint}`);
}
