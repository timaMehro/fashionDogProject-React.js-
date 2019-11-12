import { DRAWER_OPEN, DRAWER_SUCCESS } from "../../actions/app/drawerActions";

export interface AppBarState {
    open: boolean;
    payload: any;
}

const initialState: AppBarState = { open: false, payload: null };

const drawer = (state = initialState, action: any) => {
    switch (action.type) {
        case DRAWER_OPEN:
            return { ...state, open: action.open === true };
        case DRAWER_SUCCESS:
            return { ...state, payload: action.payload };
        default:
            return { ...state };
    }
}





export default drawer;
