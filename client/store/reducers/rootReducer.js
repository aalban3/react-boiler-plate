import { combineReducers } from "redux";

// base reducer, feel free to replace with any other reducers
import dummyReducer from "./dummyReducer";

export default combineReducers({
  dummy: dummyReducer,
});
