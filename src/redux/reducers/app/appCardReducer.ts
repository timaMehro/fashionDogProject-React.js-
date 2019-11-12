import { APP_FILTER_OPEN } from "../../actions/app/appCardActions";

export interface NotificationState {
    open: boolean;
    payload: any;
    enable: boolean;
}
const initialState: NotificationState = { open: false, payload: null, enable: true };



const appCardFilter = (state = initialState, action: any) => {
    switch (action.type) {
        case APP_FILTER_OPEN:
            return { ...state, open: action.open === true };
        default:
            return { ...state };
    }
};





export default appCardFilter;
