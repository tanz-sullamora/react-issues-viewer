import { createStore, combineReducers } from 'redux';

import issues from './reducers/issues';


const reducers = combineReducers({
  issues,
});

export default createStore(reducers);
