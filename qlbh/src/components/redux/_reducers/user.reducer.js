import { Constants } from "../_constants/constants";

const initialState = {
    userId: null,
    userName: null,
    role: null,
    loggedIn: false
};

/**
 * Reducer for the user state.
 *
 * @param {object} state - The current user state.
 * @param {object} action - The action object.
 * @returns {object} The updated user state.
 */
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.SET_USER:
            return {
                ...state,
                userId: action.payload?.userId,
                userName: action.payload?.username,
                role: action.payload?.role
            };
        case Constants.SET_LOGGED_IN:
            return {
                ...state,
                loggedIn: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;