import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import projectReducer from "./projectReducer";
import backlogReducer from "./backlogReducer";

export default combineReducers({
  // this gets into or update the store
  errors: errorReducer,
  project: projectReducer,
  backlog: backlogReducer
});
