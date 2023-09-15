import { Constants } from "../_constants/constants";

const initialState = {
  practiceId: null,
  practiceType: null,
  practicePartId: null,
  objectTypeId: null,
  questionId: null,
  lessonId: null,
};

const practiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.SET_PRACTICE_ID:
      return {
        ...state,
        practiceId: action.payload,
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
    case Constants.SET_PRACTICE_TYPE:
      return {
        ...state,
        practiceType: action.payload,
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
    default:
      return state;
  }
};

export default practiceReducer;