import { combineReducers } from 'redux';
import authReducer from './authReducer';
import leavesReducer from './leavesReducer';
import addLeaveReducer from './addLeaveReducer';
import profileReducer from './profileReducer';
import statusReducer from './statusReducer';

const allReducers = combineReducers({
  authState: authReducer,
  leaves: leavesReducer,
  leave: addLeaveReducer,
  user: profileReducer,
  status: statusReducer
});

const rootReducer = (state, action) => {
	  if (action.type === 'USER_LOGOUT') {
		  console.log('USER_LOGOUT');
	    state = undefined
	  }
	  return allReducers(state, action)
	}
export default rootReducer
