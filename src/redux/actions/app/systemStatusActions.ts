import { ThunkDispatch } from "redux-thunk";
import { apiAction } from "./apiActions";
import { showNotification } from "./notificationActions";
export const SYSTEM_STATUS_FILTER_REQUEST = "@app/SYSTEM_STATUS_FILTER_REQUEST";
export const SYSTEM_STATUS_FILTER_SUCCESS = "@app/SYSTEM_STATUS_FILTER_SUCCESS";
export const SYSTEM_STATUS_FILTER_FAILURE = "@app/SYSTEM_STATUS_FILTER_FAILURE";
export const SYSTEM_STATUS_REQUEST = "@app/SYSTEM_STATUS_REQUEST";
export const SYSTEM_STATUS_SUCCESS = "@app/SYSTEM_STATUS_SUCCESS";
export const SYSTEM_STATUS_FAILURE = "@app/SYSTEM_STATUS_FAILURE";

export function systemStatusFilter() {
    function requestAction() {
        return {
            type: SYSTEM_STATUS_FILTER_REQUEST,

        };
    }
    function successAction(data: any) {
        return {
            type: SYSTEM_STATUS_FILTER_SUCCESS,
            payload: data,
        };
    }
    function failedAction(error: any) {
        return {
            type: SYSTEM_STATUS_FILTER_FAILURE,
            error,
        };
    }
    return (dispatch: ThunkDispatch<any, any, any>) => {
        dispatch(requestAction());
        dispatch(apiAction({
            data: {},
            method: "GET",
            url: "/api/system/status/filter",
            onSuccess: (data, response) => {
                return successAction(data);
            },
            onFailure: (error) => {
                dispatch(showNotification(error.message, {
                    type: "danger",
                    hideTimeout: 3000,
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                }));
                return (failedAction(error));
            },
        }));
    };

}

export function getSystemStatus() {

    function requestAction() {
        return { type: SYSTEM_STATUS_REQUEST }
    }
    function successAction(data: any) {
        return { type: SYSTEM_STATUS_SUCCESS, payload: data }
    }
    function failedAction(error: any) {
        return { type: SYSTEM_STATUS_FAILURE, error }
    }

    return (dispatch: ThunkDispatch<any, any, any>) => {
        dispatch(requestAction());
        dispatch(apiAction({
            data: {},
            method: "GET",
            url: "/api/system/status",
            onSuccess: (data, response) => {
                return successAction(data);
            },
            onFailure: (error) => {
                return (failedAction(error.message));
            },
        }));

    };
}
