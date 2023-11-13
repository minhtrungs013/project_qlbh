import { Constants } from "../_constants/constants";

/**
 * Action creator for setting the user data.
 *
 * @param {object} user - An object containing user data.
 * @returns {object} An action object to dispatch the user data.
 */
export const setUser = (user) => {
  return {
    type: Constants.SET_USER,
    payload: user,
  };
};

/**
 * Action creator for setting the user's login status.
 *
 * @param {boolean} LoggedIn - A boolean indicating the user's login status.
 * @returns {object} An action object to dispatch the login status.
 */
export const setLoggedIn = (LoggedIn) => {
  return {
    type: Constants.SET_LOGGED_IN,
    payload: LoggedIn,
  };
};