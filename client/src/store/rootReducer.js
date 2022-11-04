import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import routeReducer from './route/routeReducer';

export default combineReducers({
  user: userReducer,
  route: routeReducer,
});
