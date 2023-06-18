import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import * as auth from "../components/auth/service";
import * as adverts from "../components/adverts/service";
import * as reducers from "./reducers";
import * as actionCreators from "./actions";

const reducer = combineReducers(reducers);

const componseEnhancers = composeWithDevTools({
  actionCreators,
});

export default function configureStore(preloadedState, { router }) {
  const middleware = [
    thunk.withExtraArgument({ service: { auth, adverts }, router }),
  ];

  const store = createStore(
    reducer,
    preloadedState,
    componseEnhancers(applyMiddleware(...middleware))
  );
  return store;
}
