const initialState = {};

// eslint-disable-next-line default-param-last
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SignUp': {
      return action.payload;
    }

    default:
      return state;
  }
}
