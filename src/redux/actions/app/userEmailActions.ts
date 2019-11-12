import { ThunkDispatch } from "redux-thunk";
import { apiAction } from "./apiActions";
export const USER_MAIL_OPEN = "@tracker/USER_MAIL_OPEN";
export const USER_MAIL_DISABLE = "@app/USER_MAIL_DISABLE";
export const USER_MAIL_REQUEST = "@app/USER_MAIL_REQUEST";
export const USER_MAIL_SUCCESS = "@app/USER_MAIL_SUCCESS";
export const USER_MAIL_FAILURE = "@app/USER_MAIL_FAILURE";


export function mails(open: boolean) {
    return {
        type: USER_MAIL_OPEN,
        open,

    };
}
export function hasMail(enable: boolean) {
    return {
        type: USER_MAIL_DISABLE,
        enable,

    };
}
export function getUserMail() {

    function requestAction() {
        return { type: USER_MAIL_REQUEST }
    }
    function successAction(data: any) {
        return { type: USER_MAIL_SUCCESS, payload: data }
    }
    function failedAction(error: any) {
        return { type: USER_MAIL_FAILURE, error }
    }

    return (dispatch: ThunkDispatch<any, any, any>) => {
        dispatch(requestAction());
        dispatch(apiAction({
            data: {},
            method: "GET",
            url: "/api/account/mail",
            onSuccess: (data, response) => {
                return successAction(data);
            },
            onFailure: (error) => {
                return (failedAction(error.message));
            },
        }));

    };
}
