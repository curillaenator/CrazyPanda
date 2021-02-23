import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { app } from "./Reducers/appReducer";
import { ui } from "./Reducers/uiReducer";

const rootReducer = combineReducers({
  app,
  ui,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
