import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { app } from "./Reducers/appReducer";
import { ui } from "./Reducers/uiReducer";
import { sliders } from "./Reducers/slidersReducer";
import { code } from "./Reducers/codeReducer";

const rootReducer = combineReducers({
  app,
  ui,
  sliders,
  code,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
window.store = store;
