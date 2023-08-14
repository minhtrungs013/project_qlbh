import { Constants } from "../_constants/constants";

const initialState = {
    userId: null,
    userName: null,
    role: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.SET_USER:
            return {
                ...state,
                userId: action.payload.id,
                userName: action.payload.name,
            };
        case Constants.SET_ROLE_USER:
            return {
                ...state,
                role: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;