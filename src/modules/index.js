import { combineReducers } from 'redux';
import auth from './auths';

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;