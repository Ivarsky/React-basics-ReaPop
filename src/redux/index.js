import { createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import reducer from './reducers';
import * as actionCreators from './actions';

const componseEnhancers = composeWithDevTools({
  actionCreators,
});

export default function configureStore() {
  const store = createStore(reducer, componseEnhancers());
  return store;
}
