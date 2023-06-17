import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import * as reducers from "./reducers";
import * as actionCreators from "./actions";

const reducer = combineReducers(reducers);

const componseEnhancers = composeWithDevTools({
  actionCreators,
});

const middleware = [thunk];

export default function configureStore(preloadedState) {
  const store = createStore(
    reducer,
    preloadedState,
    componseEnhancers(applyMiddleware(...middleware))
  );
  return store;
}
