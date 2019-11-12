import { Action, combineReducers } from "redux";
import {
    TICKETS_GETALL_FAILURE, TICKETS_GETALL_REQUEST,
    TICKETS_GETALL_SUCCESS
} from "../../actions/support/ticketsActions";

export function tickets(state: ticketsState = {
    pending: false, payload: { data: [], page: 1, limit: 10 },
}, action: any) {
    switch (action.type) {
        case TICKETS_GETALL_REQUEST:
            return { ...state, pending: true };
        case TICKETS_GETALL_SUCCESS:
            return { ...state, pending: false, payload: action.payload };
        case TICKETS_GETALL_FAILURE:
            return { ...state, pending: false };

        default:
            return state;
    }
}

export interface ticketsState {

    payload: any;
    pending?: boolean;

    errorMessage?: string;
}
