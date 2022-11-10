import {
  INIT_ROUTE, ADD_ROUTE, CHANGE_ROUTE, DELETE_ROUTE,
} from './constans';

export const routesInit = () => async (dispatch) => {
  try {
    const res = await fetch('http://localhost:3001/api/v1/routes/myroutes', {
      method: 'GET',
      credentials: 'include',
    });
    const routesFromBack = await res.json();
    dispatch({ type: INIT_ROUTE, payload: routesFromBack });
  } catch (error) {
    console.log(error);
  }
};

export function newRoute(route) {
  return { type: ADD_ROUTE, payload: route };
}

export function routeChange() {
  return { type: CHANGE_ROUTE };
}

export const routeDelete = (id) => async (dispatch) => {
  try {
    await fetch(`http://localhost:3001/api/v1/routes/route/${id}`, {
      method: 'DELETE',
    });
    dispatch({ type: DELETE_ROUTE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
