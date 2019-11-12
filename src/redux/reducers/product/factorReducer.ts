import { Action, combineReducers } from "redux";
import {
    PRODUCT_FACTOR_GETALL_FAILURE, PRODUCT_FACTOR_GETALL_REQUEST,
    PRODUCT_FACTOR_GETALL_SUCCESS
} from "../../actions/product/factorActions";

export function factor(state: factorState = {
    pending: false, payload: { data: [], page: 1, limit: 10 },
}, action: any) {
    switch (action.type) {
        case PRODUCT_FACTOR_GETALL_REQUEST:
            return { ...state, pending: true };
        case PRODUCT_FACTOR_GETALL_SUCCESS:
            return { ...state, pending: false, payload: action.payload };
        case PRODUCT_FACTOR_GETALL_FAILURE:
            return { ...state, pending: false };

        default:
            return state;
    }
}

export interface factorState {

    payload: any;
    pending?: boolean;

    errorMessage?: string;
}
