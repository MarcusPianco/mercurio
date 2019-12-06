const initialstate = {
	contacts: []
};

const protocolReducer = (state = initialstate, action) => {
	switch (action.type) {
		case 'DELETE_CONTACT':
			return {
				...state,
				contacts: state.contacts.filter((contact) => contact.id !== action.payload)
			};
		case 'ADD_CONTACT':
			return {
				...state,
				contacts: [ action.payload, ...state.contacts ]
			};

		default:
			return state;
	}
};

export default contactReducer;
