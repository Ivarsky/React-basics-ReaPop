import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import * as reducers from './reducers';
import * as actionCreators from './actions';

const reducer = combineReducers(reducers);

const componseEnhancers = composeWithDevTools({
  actionCreators,
});

export default function configureStore(preloadedState) {
  const store = createStore(reducer, preloadedState, componseEnhancers());
  return store;
}
