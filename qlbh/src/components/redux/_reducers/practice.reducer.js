import { Constants } from "../_constants/constants";

const initialState = {
  practiceId: null,
  practiceType: null,
  practicePart: null,
  practicePartId: null,
  objectTypeId: null,
  questions: null,
  questionId: null,
  lessonId: null,
  listTestsItem: null,
  listQuestions: null,
};

/**
 * Reducer for the practice state.
 *
 * @param {object} state The current practice state.
 * @param {object} action The action object.
 * @returns {object} The new practice state.
 */
const practiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.SET_PRACTICE_ID:
      return {
        ...state,
        practiceId: action.payload,
      };
    case Constants.SET_PRACTICE_TYPE:
      return {
        ...state,
        practiceType: action.payload,
      };
    case Constants.SET_PRACTICE_PART:
      return {
        ...state,
        practicePart: action.payload,
      };
    case Constants.SET_PRACTICE_PART_ID:
      return {
        ...state,
        practicePartId: action.payload,
      };
    case Constants.SET_OBJECT_ID:
      return {
        ...state,
        objectTypeId: action.payload,
      };
    case Constants.SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
    case Constants.SET_LESSON:
      return {
        ...state,
        lessonId: action.payload,
      };
      case Constants.SET_QUESTION_ID:
        return {
          ...state,
          questionId: action.payload,
        };
      case Constants.SET_LIST_TESTS_ITEMS:
        return {
          ...state,
          listTestsItem: action.payload,
        };
      case Constants.SET_LIST_QUESTIONS:
        return {
          ...state,
          listQuestions: action.payload,
        };
    default:
      return state;
  }
};

export default practiceReducer;