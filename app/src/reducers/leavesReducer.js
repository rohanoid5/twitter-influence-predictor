export default function (state = null, action) {
	switch (action.type) {
		case 'GET_LEAVES':
			return action.payload;
	}
	return state;
}
