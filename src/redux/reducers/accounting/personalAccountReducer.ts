import { Action, combineReducers } from "redux";
import {
    ACCOUNT_GETALL_FAILURE, ACCOUNT_GETALL_REQUEST,
    ACCOUNT_GETALL_SUCCESS
} from "../../actions/accounts/accountsActions";

export function personalAccount(state: personalAccountState = {
    pending: false, payload: { data: [], page: 1, limit: 10 },
}, action: any) {
    switch (action.type) {
        case ACCOUNT_GETALL_REQUEST:
            return { ...state, pending: true };
        case ACCOUNT_GETALL_SUCCESS:
            return { ...state, pending: false, payload: action.payload };
        case ACCOUNT_GETALL_FAILURE:
            return { ...state, pending: false };

        default:
            return state;
    }
}

export interface personalAccountState {

    payload: any;
    pending?: boolean;

    errorMessage?: string;
}
