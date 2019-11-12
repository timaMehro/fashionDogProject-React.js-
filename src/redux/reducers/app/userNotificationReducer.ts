import { USER_NOTIFICATION_OPEN, USER_NOTIFICATION_SUCCESS, USER_NOTIFICATION_DISABLE } from "../../actions/app/userNotificationActions";

export interface NotificationState {
    open: boolean;
    payload: any;
    enable:boolean;
}
const initialState: NotificationState = { open: false, payload: null ,enable:true};



const userNotification = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_NOTIFICATION_DISABLE:
        return { ...state, enable: action.enable === true };
        case USER_NOTIFICATION_OPEN:
            return { ...state, open: action.open === true };
        case USER_NOTIFICATION_SUCCESS:
            return { ...state, payload: action.payload };
        default:
            return { ...state };
    }
};





export default userNotification;
