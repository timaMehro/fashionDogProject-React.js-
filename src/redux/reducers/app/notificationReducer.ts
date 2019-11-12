import { NOTIFICATION_HIDE, NOTIFICATION_SHOW } from "../../actions/app/notificationActions";

const initialState: NotificationState = { message: "", open: false , config: null };

const notification = (state = initialState, action: any) => {
    switch (action.type) {
        case NOTIFICATION_SHOW:
            return { ...state, message: action.message, open: true , config: action.config };
        case NOTIFICATION_HIDE:
            return { ...state, message: "", open: false , config: null };
        default:
            return { ...state };
    }


};

export default notification;

export interface NotificationState {

    config?: {
        type?: "success"| "info"| "warning" | "danger",
        anchorOrigin?: { vertical: "top"| "center" | "bottom",
        horizontal: "left"|"center"|"center"},
        closable?: boolean, hideTimeout?: number};
    message: string;
    open: boolean;
}
