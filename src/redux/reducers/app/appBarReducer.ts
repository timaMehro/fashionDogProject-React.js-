import { APP_BAR_SUCCESS } from "../../actions/app/appBarActions";

export interface AppbarStates {
    payload: any;
}

const initialState: AppbarStates = { payload: null };

const appbar = (state = initialState, action: any) => {
    switch (action.type) {
        case APP_BAR_SUCCESS:
            return { ...state, payload: action.payload };
        default:
            return { ...state };
    }
}





export default appbar;
