import { API_BASE } from "../config";
import API from "../instance";


export function sendVocabularyAnswers(endpoint, body) {
    return API.post(`${API_BASE}/${endpoint}`, body);
}


export function GetQuestionsByObjectTypeId(endpoint, body) {
    return API.get(`${API_BASE}/${endpoint}`, body);
}


export function getQuestionByTestId(endpoint, body = null) {
    return API.get(`${API_BASE}/${endpoint}`, body);
}