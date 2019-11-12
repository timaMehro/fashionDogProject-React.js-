import { ThunkDispatch } from "redux-thunk";
import { apiAction } from "./apiActions";
export const USER_NOTIFICATION_OPEN = "@tracker/USER_NOTIFICATION_OPEN";
export const USER_NOTIFICATION_DISABLE = "@app/USER_NOTIFICATION_DISABLE";
export const USER_NOTIFICATION_REQUEST = "@app/USER_NOTIFICATION_REQUEST";
export const USER_NOTIFICATION_SUCCESS = "@app/USER_NOTIFICATION_SUCCESS";
export const USER_NOTIFICATION_FAILURE = "@app/USER_NOTIFICATION_FAILURE";


export function notifications(open: boolean) {
    return {
        type: USER_NOTIFICATION_OPEN,
        open,

    };
}
export function hasNotifications(enable: boolean) {
    return {
        type: USER_NOTIFICATION_DISABLE,
        enable,

    };
}
export function getUserNotification() {

    function requestAction() {
        return { type: USER_NOTIFICATION_REQUEST }
    }
    function successAction(data: any) {
        return { type: USER_NOTIFICATION_SUCCESS, payload: data }
    }
    function failedAction(error: any) {
        return { type: USER_NOTIFICATION_FAILURE, error }
    }

    return (dispatch: ThunkDispatch<any, any, any>) => {
        dispatch(requestAction());
        dispatch(apiAction({
            data: {},
            method: "GET",
            url: "/api/account/notification",
            onSuccess: (data, response) => {
                return successAction(data);
            },
            onFailure: (error) => {
                return (failedAction(error.message));
            },
        }));

    };
}
