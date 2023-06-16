import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import * as reducers from "./reducers";
import * as actionCreators from "./actions";

const reducer = combineReducers(reducers);

const componseEnhancers = composeWithDevTools({
  actionCreators,
});
//TODO: store timestamp y noaction borrar
const logger = (store) => (next) => (action) => {
  if (action.type) {
    console.group(action.type);
    console.info("dispatching", action, store.getState());
    const result = next(action);
    console.log("next state", store.getState());
    console.groupEnd();
    return result;
  }
  return next(action);
};

const timestamp = (store) => (next) => (action) => {
  return next({
    ...action,
    meta: {
      ...action.meta,
      timestamp: Date.now(),
    },
  });
};

const noAction = (store) => (next) => (action) => {
  if (action.type === "NO TROW") {
    return;
  }
  return next(action);
};

const middleware = [thunk, timestamp, logger, noAction];

export default function configureStore(preloadedState) {
  const store = createStore(
    reducer,
    preloadedState,
    componseEnhancers(applyMiddleware(...middleware))
  );
  return store;
}
