import { Constants } from "../_constants/constants";

export const setPracticeId = (id) => {
  return {
    type: Constants.SET_PRACTICE_ID,
    payload: id,
  };
};

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

export const setObjectId = (id) => {
  return {
    type: Constants.SET_OBJECT_ID,
    payload: id,
  };
};