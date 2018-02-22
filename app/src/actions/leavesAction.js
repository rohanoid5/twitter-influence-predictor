import axios from 'axios';
import { LOGIN_SERVER } from './apihost.js';
import { hashHistory  } from 'react-router';

export function getLeaves() {
	let accessToken = localStorage.getItem('access_token');
	var leavesUrl = LOGIN_SERVER + '/leaves';
	return function(dispatch) {
		return axios({
			url: leavesUrl,
			headers: {
				'Authorization': accessToken,
				'Content-Type': 'application/json'
			},
			method: 'get'
		}).then(function(response) {
			dispatch({
				type: 'GET_LEAVES',
				payload: response.data.leaves
			});
			console.log(response.data);
		}).catch(function(error) {
			console.log(error);
		});
	};
}

export function submitLeave(leave, leave_type) {
	let accessToken = localStorage.getItem('access_token');
	//console.log(leave);
	let data = {
		reason: leave.reason,
		start_date: leave.start_date,
		end_date: leave.end_date,
		leave_type: leave_type,
	}
	return function (dispatch) {
		dispatch({ type: 'LEAVES_FETCHING', payload: data });
		return axios.post(LOGIN_SERVER + '/leaves', data, {
			headers: {
				'Authorization': accessToken,
				'Content-type': 'application/json'
			}
		}).then(function (response) {
			if (response) {
				dispatch({ type: 'LEAVES_RECEIVED', payload: response.data });
				hashHistory.push('/home');
			} else {
				dispatch({ type: 'LEAVES_ERROR', payload: response.data });
			}
		})
			.catch(function (error) {
				dispatch({ type: 'LEAVES_ERROR', payload: error });
			});
	};
}

export function submitStatus(status, id) {
	let body = {approval_status: status};
	let accessToken = localStorage.getItem('access_token');
	//console.log(leave);
	var leavesUrl = 'https://leave-request-api.herokuapp.com' + '/leaves/' + id;
	return function (dispatch) {
		dispatch({ type: 'STATUS_FETCHING', payload: body });
		return axios.put(leavesUrl, body, {
			headers: {
				'Authorization': accessToken,
				'Content-type': 'application/json'
			}
		}).then(function (response) {
			if (response) {
				dispatch({ type: 'STATUS_RECEIVED', payload: response.data });
				hashHistory.push('/login');
			} else {
				dispatch({ type: 'STATUS_ERROR', payload: response.data });
			}
		})
			.catch(function (error) {
				dispatch({ type: 'STATUS_ERROR', payload: error });
			});
	};
}
