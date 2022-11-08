import {
  SIGNIN_USER, SIGNUP_USER, LOGOUT_USER, CHECK_USER,
} from './constans';

const initialState = {};

// eslint-disable-next-line default-param-last
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_USER: {
      return action.payload;
    }
    case SIGNUP_USER: {
      return action.payload;
    }
    case SIGNIN_USER: {
      return action.payload;
    }
    case LOGOUT_USER: {
      return {};
    }

    default:
      return state;
  }
}
