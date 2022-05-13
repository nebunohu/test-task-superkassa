import { wsReducer } from "./ws-reducer";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  ws: wsReducer
});