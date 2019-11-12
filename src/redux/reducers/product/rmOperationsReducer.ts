import { Action, combineReducers } from "redux";
import {
    RM_OPERAITION_GETALL_FAILURE, RM_OPERAITION_GETALL_REQUEST,
    RM_OPERAITION_GETALL_SUCCESS
} from "../../actions/product/rmOperationsActions";

export function rm(state: rmOperationsState = {
    pending: false, payload: { data: [], page: 1, limit: 10 },
}, action: any) {
    switch (action.type) {
        case RM_OPERAITION_GETALL_REQUEST:
            return { ...state, pending: true };
        case RM_OPERAITION_GETALL_SUCCESS:
            return { ...state, pending: false, payload: action.payload };
        case RM_OPERAITION_GETALL_FAILURE:
            return { ...state, pending: false };

        default:
            return state;
    }
}

export interface rmOperationsState {

    payload: any;
    pending?: boolean;

    errorMessage?: string;
}
