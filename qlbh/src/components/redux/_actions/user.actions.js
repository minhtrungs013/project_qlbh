import { Constants } from "../_constants/constants";

export const setUser = (user) => {
  return {
    type: Constants.SET_USER,
    payload: user,
  };
};
export const setRoleUser = (role) => {
    return {
      type: Constants.SET_ROLE_USER,
      payload: role,
    };
  };
