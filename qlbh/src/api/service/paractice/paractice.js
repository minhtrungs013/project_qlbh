import { API_BASE } from "../../config";
import API from "../../instance";


export function getAllPracticesWithoutParts(endpoint) {
    return API.get(`${API_BASE}/${endpoint}`);
}

export function getPracticePartsWithoutLessonsAndTestsByPracticeId(endpoint) {
    return API.get(`${API_BASE}/${endpoint}`);
}

export function getListenTopicByPracticePartId(endpoint) {
    return API.get(`${API_BASE}/${endpoint}`);
}


export function getPracticePartsLessonsByPracticeId(endpoint) {
    return API.get(`${API_BASE}/${endpoint}`);
}

export function getAllHistoryByTestIds(endpoint, body) {
    return API.post(`${API_BASE}/${endpoint}`, body);
}
export function getPartLessonId(endpoint) {
    return API.get(`${API_BASE}/${endpoint}`);
}