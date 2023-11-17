import { Constants } from "../_constants/constants";

/**
 * Creates an action to set the practice ID.
 *
 * @param {number} id The practice ID to set.
 * @returns {object} An action object with the type `SET_PRACTICE_ID` and the payload `id`.
 */
export const setPracticeId = (id) => {
  return {
    type: Constants.SET_PRACTICE_ID,
    payload: id,
  };
};

/**
 * Creates an action to set the practice type.
 *
 * @param {string} type The practice type to set.
 * @returns {object} An action object with the type `SET_PRACTICE_TYPE` and the payload `type`.
 */
export const setPracticeType = (type) => {
  return {
    type: Constants.SET_PRACTICE_TYPE,
    payload: type,
  };
};

export const setPracticePartId = (id) => {
  return {
    type: Constants.SET_PRACTICE_PART_ID,
    payload: id,
  };
};

export const setPracticePart = (practicePart) => {
  return {
    type: Constants.SET_PRACTICE_PART,
    payload: practicePart,
  };
};

export const setObjectId = (id) => {
  return {
    type: Constants.SET_OBJECT_ID,
    payload: id,
  };
};

export const setQuestionsByTestId = (questions) => {
  return {
    type: Constants.SET_QUESTIONS,
    payload: questions,
  };
};

export const setQuestionId = (id) => {
  return {
    type: Constants.SET_QUESTION_ID,
    payload: id,
  };
};

export const setDataTests = (id) => {
  return {
    type: Constants.SET_LIST_TESTS_ITEMS,
    payload: id,
  };
};
export const setDataQuestions = (id) => {
  return {
    type: Constants.SET_LIST_QUESTIONS,
    payload: id,
  };
};
