import { push } from "react-router-redux";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { resetCred, setUser } from "../../../utils/helpers/authHelper";
import { apiAction } from "./apiActions";
import { showNotification } from "./notificationActions";
export const LOGIN_REQUEST = "@app/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "@app/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "@app/LOGIN_FAILURE";

export const LOGOUT_REQUEST = "@app/LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "@app/LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "@app/LOGOUT_FAILURE";

export interface CredType {
    username: string;
    password: string;
}

// this is log out action
export function logoutUser() {
    return (dispatch: Dispatch) => {
        dispatch(requestLogout());
        resetCred();
        dispatch(reciveLogout());
    };
    function requestLogout() {
        return {
            type: LOGOUT_REQUEST,
            isFetching: true,
            isAuthenticated: true,
        };
    }
    function reciveLogout() {
        return {
            type: LOGOUT_SUCCESS,
            isFetching: false,
            isAuthenticated: false,
        };
    }
}

// this is login action
export function loginUser(creds: CredType) {
    return (dispatch: ThunkDispatch<any, any, any>) => {
        dispatch(requestLogin(creds));
        dispatch(apiAction({
            data: creds,
            method: "Post",
            url: "/api/account/signin",
            onSuccess: (data, response) => {
                if (!response.ok) {
                    dispatch(showNotification(data.message, {
                        type: "warning",
                        hideTimeout: 5000,
                    }));
                    return loginError(data.message);
                } else {
                    localStorage.setItem("access_token", data.accessToken);
                    localStorage.setItem("access_token_type", data.access_token_type);
                    setUser(data.user);
                    dispatch(showNotification(`${data.user.fullname} گرامی ، شما در کوانتوم هستید.`,
                        {
                            type: "success",
                            hideTimeout: 3000,
                            anchorOrigin: { vertical: "top", horizontal: "center" },
                        }));
                    dispatch(push("/admin/dashboard"));
                    return reciveLogin(data);
                }
            },
            onFailure: (error) => {
                dispatch(showNotification(error.message, {
                    type: "danger",
                    hideTimeout: 3000,
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                }));
                return (loginError(error.message));
            },
        }));

    };
}

// this is request login action
export function requestLogin(creds: CredType) {
    return {
        type: LOGIN_REQUEST,
        pending: true,
        isAuthenticated: false,
        creds,
    };
}
export function reciveLogin(user: any) {
    return {
        type: LOGIN_SUCCESS,
        pending: false,
        isAuthenticated: true,
        accessToken: user.accessToken,
    };
}
export function loginError(message: any) {
    return {
        type: LOGIN_FAILURE,
        pending: false,
        isAuthenticated: false,
        message,
    };
}
