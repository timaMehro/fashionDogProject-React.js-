import { Action, combineReducers } from "redux";
import {
    PRODUCT_LIST_GETALL_FAILURE, PRODUCT_LIST_GETALL_REQUEST,
    PRODUCT_LIST_GETALL_SUCCESS
} from "../../actions/product/listActions";

export function list(state: listState = {
    pending: false, payload: { data: [], page: 1, limit: 10 },
}, action: any) {
    switch (action.type) {
        case PRODUCT_LIST_GETALL_REQUEST:
            return { ...state, pending: true };
        case PRODUCT_LIST_GETALL_SUCCESS:
            return { ...state, pending: false, payload: action.payload };
        case PRODUCT_LIST_GETALL_FAILURE:
            return { ...state, pending: false };

        default:
            return state;
    }
}

export interface listState {

    payload: any;
    pending?: boolean;
    errorMessage?: string;
}
