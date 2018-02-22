const initialState = {
	fetching: false,
	response: '',
	error: false,
	leave_type: 'OTHERS'
}

export default function (state = initialState, action) {
	if (action && action.type) {
		switch (action.type) {

			case 'LEAVES_FETCHING':
				return Object.assign({}, state, { data: action.payload, fetching: true });
			case 'LEAVES_RECEIVED':
				//return {...state, fetching: false, details: action.payload}
				state.fetching = false;
				state.response = action.payload;
        console.log(action.payload);
				return state;
			case 'LEAVES_ERROR':
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
