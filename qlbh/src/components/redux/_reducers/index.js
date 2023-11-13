import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user.reducer";
import practiceReducer from "./practice.reducer";

const rootReducer = combineReducers({
    userReducer,
    practiceReducer
})

export default rootReducer