import { combineReducers } from "redux";
import authReducer from './authReducer';
import forumReducer from "./forumReducer";

export const reducers = combineReducers({ authReducer, forumReducer });