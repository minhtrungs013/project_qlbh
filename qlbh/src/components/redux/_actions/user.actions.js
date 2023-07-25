import { Constants } from "../_constants/constants";

export const setPracticeId = (id) => {
    return {
      type: Constants.SET_PRACTICE_ID,
      payload: id,
    };
  };