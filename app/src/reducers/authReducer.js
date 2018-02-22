export default function(state = {
		logging:false,
		isLoggedIn:localStorage.getItem('access_token')!=null?true:false,
		error:false,
		errorMsg:null
	}, action) {
  if(action && action.type){
    switch (action.type) {
      case 'USER_LOGIN_REQUEST':
      	return Object.assign({}, state, { logging:true });
      	break;
      case 'USER_LOGGED_IN':
  	    return Object.assign({}, state, { logging:false, isLoggedIn: true, error:false });
        break;
      case 'USER_LOGIN_ERROR':
      	return Object.assign({}, state, { logging:false, isLoggedIn: false, error:true, errorMsg: action.payload });
          break;
      default:
        return state;
      }
    } else {
      return state;
    }
}
