import { Action, combineReducers } from "redux";
import {
    SETTINGS_GETALL_FAILURE, SETTINGS_GETALL_REQUEST,
    SETTINGS_GETALL_SUCCESS
} from "../../actions/administration/settings";

export function transactions(state: transactionsState = {
    pending: false, payload: { data: [], page: 1, limit: 10 },
}, action: any) {
    switch (action.type) {
        case SETTINGS_GETALL_REQUEST:
            return { ...state, pending: true };
        case SETTINGS_GETALL_SUCCESS:
            return { ...state, pending: false, payload: action.payload };
        case SETTINGS_GETALL_FAILURE:
            return { ...state, pending: false };

        default:
            return state;
    }
}

export interface transactionsState {

    payload: any;
    pending?: boolean;

    errorMessage?: string;
}
