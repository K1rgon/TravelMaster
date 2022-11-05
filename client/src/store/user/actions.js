import {
  SIGNIN_USER, LOGOUT_USER, CHECK_USER,
} from './constans';

export function check(objUser) {
  return { type: CHECK_USER, payload: objUser };
}

export function signIn(objUser) {
  return { type: SIGNIN_USER, payload: objUser };
}

export function logout() {
  return { type: LOGOUT_USER };
}
