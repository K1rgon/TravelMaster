import {
  INIT_ROUTE, ADD_ROUTE, CHANGE_ROUTE, DELETE_ROUTE,
} from './constans';

export function routesInit(route) {
  return { type: INIT_ROUTE, payload: route };
}

export function newRoute(route) {
  return { type: ADD_ROUTE, payload: route };
}

export function routeChange() {
  return { type: CHANGE_ROUTE };
}

export function routeDelete() {
  return { type: DELETE_ROUTE };
}
