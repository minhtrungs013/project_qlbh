import { combineReducers } from "@reduxjs/toolkit";
import practiceReducer from "./practice.reducer";
import userReducer from "./user.reducer";
const rootReducer = combineReducers({
    practiceReducer,
    userReducer
})

export default rootReducer