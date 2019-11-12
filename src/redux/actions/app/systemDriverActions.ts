import { ThunkDispatch } from "redux-thunk";
import { apiAction } from "./apiActions";
import { showNotification } from "./notificationActions";
export const SYSTEM_DRIVER_FILTER_REQUEST = "@app/SYSTEM_DRIVER_FILTER_REQUEST";
export const SYSTEM_DRIVER_FILTER_SUCCESS = "@app/SYSTEM_DRIVER_FILTER_SUCCESS";
export const SYSTEM_DRIVER_FILTER_FAILURE = "@app/SYSTEM_DRIVER_FILTER_FAILURE";
export const SYSTEM_DRIVER_REQUEST = "@app/SYSTEM_DRIVER_REQUEST";
export const SYSTEM_DRIVER_SUCCESS = "@app/SYSTEM_DRIVER_SUCCESS";
export const SYSTEM_DRIVER_FAILURE = "@app/SYSTEM_DRIVER_FAILURE";

export function systemDriverFilter() {
    function requestAction() {
        return {
            type: SYSTEM_DRIVER_FILTER_REQUEST,

        };
    }
    function successAction(data: any) {
        return {
            type: SYSTEM_DRIVER_FILTER_SUCCESS,
            payload: data,
        };
    }
    function failedAction(error: any) {
        return {
            type: SYSTEM_DRIVER_FILTER_FAILURE,
            error,
        };
    }
    return (dispatch: ThunkDispatch<any, any, any>) => {
        dispatch(requestAction());
        dispatch(apiAction({
            data: {},
            method: "GET",
            url: "/api/system/driver/filter",
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

export function getSystemDriver() {

    function requestAction() {
        return { type: SYSTEM_DRIVER_REQUEST };
    }
    function successAction(data: any) {
        return { type: SYSTEM_DRIVER_SUCCESS, payload: data };
    }
    function failedAction(error: any) {
        return {
            type: SYSTEM_DRIVER_FAILURE,
            error
        };
    }

    return (dispatch: ThunkDispatch<any, any, any>) => {
        dispatch(requestAction());
        dispatch(apiAction({
            data: {},
            method: "GET",
            url: "/api/system/driver",
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
