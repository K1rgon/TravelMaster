import {
  SIGNIN_USER, SIGNUP_USER, LOGOUT_USER, CHECK_USER,
} from './constans';

export function signUp(objUser) {
  return { type: SIGNUP_USER, payload: objUser };
}

export function signIn(objUser) {
  return { type: SIGNIN_USER, payload: objUser };
}

export function logout() {
  return { type: LOGOUT_USER };
}
