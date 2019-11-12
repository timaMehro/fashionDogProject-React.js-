import { SYSTEM_DRIVER_SUCCESS, SYSTEM_DRIVER_FILTER_SUCCESS } from "../../actions/app/systemDriverActions";

export interface AppState {
    payload: any;
    filter: any[];
}

const initialState: AppState = { payload: null, filter: [] };

const systemDriver = (state = initialState, action: any) => {
    switch (action.type) {
        case SYSTEM_DRIVER_FILTER_SUCCESS:
            return { ...state, filter: action.payload }
        case SYSTEM_DRIVER_SUCCESS:
            return { ...state, payload: action.payload };
        default:
            return { ...state };
    }
};





export default systemDriver;
