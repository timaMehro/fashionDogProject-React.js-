import { Dispatch } from "redux";
import { GetAllDataOptions } from "../../../utils/types";
import { apiAction } from "../app/apiActions";
import { showNotification } from "./notificationActions";
import { ThunkDispatch } from "redux-thunk";
export const SYSTEM_MISSION_FILTER_REQUEST = "@app/SYSTEM_MISSION_FILTER_REQUEST";
export const SYSTEM_MISSION_FILTER_SUCCESS = "@app/SYSTEM_MISSION_FILTER_SUCCESS";
export const SYSTEM_MISSION_FILTER_FAILURE = "@app/SYSTEM_MISSION_FILTER_FAILURE";
export const SYSTEM_MISSION_GETALL_REQUEST = "@app/SYSTEM_MISSION_GETALL_REQUEST";
export const SYSTEM_MISSION_GETALL_SUCCESS = "@app/SYSTEM_MISSION_GETALL_SUCCESS";
export const SYSTEM_MISSION_GETALL_FAILURE = "@app/SYSTEM_MISSION_GETALL_FAILURE";

export function systemMissionFilter() {
    function requestAction() {
        return {
            type: SYSTEM_MISSION_FILTER_REQUEST,

        };
    }
    function successAction(data: any) {
        return {
            type: SYSTEM_MISSION_FILTER_SUCCESS,
            payload: data,
        };
    }
    function failedAction(error: any) {
        return {
            type: SYSTEM_MISSION_FILTER_FAILURE,
            error,
        };
    }
    return (dispatch: ThunkDispatch<any, any, any>) => {
        dispatch(requestAction());
        dispatch(apiAction({
            data: {},
            method: "GET",
            url: "/api/system/mission/filter",
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

export function getAll(options?: GetAllDataOptions) {


    return (dispatch: Dispatch) => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(request());
        dispatch(apiAction({
            data: options,
            method: "GET",
            url: "/api/system/mission/",
            onSuccess: (data, response) => {
                if (!response.ok) {
                    return failure(data.message);
                } else {
                    return success(data);
                }
            },
            onFailure: (error) => {
               return failure(error.message);
            },

        }));

    };


    function request() { return { type: SYSTEM_MISSION_GETALL_REQUEST }; }
    function success(payload: any) { return { type: SYSTEM_MISSION_GETALL_SUCCESS, payload }; }
    function failure(error: any) { return { type: SYSTEM_MISSION_GETALL_FAILURE, error }; }

}



