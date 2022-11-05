import {
  ADD_ROUTE, INIT_ROUTE, CHANGE_ROUTE, DELETE_ROUTE,
} from './constans';

const initialState = [];

// eslint-disable-next-line default-param-last
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_ROUTE: {
      return action.payload;
    }
    case ADD_ROUTE: {
      return [...state, action.payload];
    }
    case CHANGE_ROUTE: {
      return [...state];
    }
    case DELETE_ROUTE: {
      return [...state.filter((el) => el.id !== action.payload)];
    }

    default:
      return state;
  }
}
