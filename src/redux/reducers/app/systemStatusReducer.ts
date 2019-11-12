import {
    SYSTEM_STATUS_FILTER_SUCCESS,
    SYSTEM_STATUS_SUCCESS,
} from "../../actions/app/systemStatusActions";

export interface AppState {
    payload: any;
    open: boolean;
    filter: any[];
}

const initialState: AppState = { open: false, payload: null, filter: [] };

const systemStatus = (state = initialState, action: any) => {
    switch (action.type) {
        case SYSTEM_STATUS_FILTER_SUCCESS:
            return { ...state, filter: action.payload };
        case SYSTEM_STATUS_SUCCESS:
            return { ...state, payload: action.payload };
        default:
            return { ...state };
    }
};





export default systemStatus;
