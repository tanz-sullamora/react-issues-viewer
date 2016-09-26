import { createStore, combineReducers } from 'redux';

import issue from './reducers/issue';
import issues from './reducers/issues';


const reducers = combineReducers({
  issue,
  issues,
});

export default createStore(reducers);
