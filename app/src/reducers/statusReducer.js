const initialState = {
	fetching: false,
	response: '',
	error: false,
	approval_status: 'PENDING'
}

export default function (state = initialState, action) {
	if (action && action.type) {
		switch (action.type) {
			case 'STATUS_FETCHING':
				return Object.assign({}, state, { data: action.payload, fetching: true });
			case 'STATUS_RECEIVED':
				//return {...state, fetching: false, details: action.payload}
				state.fetching = false;
				state.response = action.payload;
        console.log(action.payload);
				return state;
			case 'STATUS_ERROR':
				state.fetching = false;
				state.response = action.payload;
				console.log(action.payload);
				return state;
			default:
				return state;
		}
	} else {
		return state;
	}
}
