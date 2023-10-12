import { setLoggedIn } from "../_actions/user.actions";
import { Constants } from "../_constants/constants";

const initialState = {
    userId: null,
    userName: null,
    role: null,
    loggedIn: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.SET_USER:
            return {
                ...state,
                userId: action.payload?.userId,
                userName: action.payload?.name || action.payload?.username,
            };
        case Constants.SET_ROLE_USER:
            return {
                ...state,
                role: action.payload,
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