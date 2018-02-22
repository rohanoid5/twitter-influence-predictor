import axios from 'axios';
import md5 from 'md5';
import querystring from 'querystring';

import {
  browserHistory
} from 'react-router'
import {
  hashHistory
} from 'react-router'

import {
  LOGIN_SERVER
} from './apihost.js'

export function logginUser(userDetail) {
  const url = LOGIN_SERVER + '/authenticate';
  let postBody = {

  };

  if (userDetail) {
    let data = {
      'email': userDetail.email,
      'password': userDetail.password
    }

    return function(dispatch) {
      dispatch({
        type: 'USER_LOGIN_REQUEST'
      });
      return axios.post(LOGIN_SERVER + '/authenticate', data, {
        headers: {
        	'Content-type': 'application/json'
        }
      }).then(function(response) {
        if(response.data.success) {
          localStorage.setItem('access_token', response.data.token);
          dispatch({
            type: 'USER_LOGGED_IN',
            payload: response.data.token
          });
          hashHistory.replace('/home');
        } else {
          hashHistory.replace('/login');
        }
      }).catch(function(error) {
        dispatch({
          type: 'USER_LOGIN_ERROR',
          payload: error.response.data
        });
        console.log(error.response.data);
      });
    };
  }
}

export function signupUser(userDetail, role) {
  return function(dispatch) {
    if (userDetail) {
        let data = {
          'username': userDetail.username,
          'password': userDetail.password,
          'name': userDetail.name,
          'email': userDetail.email,
          'role': role
        };
        dispatch({
          type: 'USER_LOGIN_REQUEST'
        });
        axios.post(LOGIN_SERVER + '/register', querystring.stringify(data), {
          headers: {
          	'Content-type': 'application/x-www-form-urlencoded'
          }
        }).then(function(response) {
          dispatch({
            type: 'USER_LOGGED_IN',
            payload: response.data.access_token
          });
          hashHistory.replace('/login');
        }).catch(function(error) {
          dispatch({
            type: 'USER_LOGIN_ERROR',
            payload: error.response.data
          });
          console.log('responseError', error.response.status, error.response.data.error[0].errorDescription);
        });
    }
  };
}

export function logoutUser() {
	localStorage.removeItem('access_token');
  return function(dispatch){
	  dispatch({
      type: 'USER_LOGOUT'
	  });
  };
}
