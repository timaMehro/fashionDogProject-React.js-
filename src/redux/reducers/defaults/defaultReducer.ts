import { Action, combineReducers } from "redux";
import { DEFAULT_GETALL_FAILURE,
   DEFAULT_GETALL_REQUEST,
   DEFAULT_GETALL_SUCCESS } from "../../actions/defaults/defaultActions";

export function defaults(state: DefaultState = {
    pending: false, payload: {data: [], page: 1, limit: 10},
},                       action: any) {
  switch (action.type) {
    case DEFAULT_GETALL_REQUEST:
    return {...state, pending: true};
    case DEFAULT_GETALL_SUCCESS:
    return {...state, pending: false, payload: action.payload};
    case DEFAULT_GETALL_FAILURE:
      return {...state, pending: false};

    default:
      return state;
  }
}

export interface DefaultState {

    payload: any;
    pending?: boolean;

    errorMessage?: string;
}
