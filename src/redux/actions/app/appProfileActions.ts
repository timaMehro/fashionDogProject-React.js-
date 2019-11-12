import { ThunkDispatch } from "redux-thunk";

import { apiAction } from "./apiActions";

export const APP_PROFILE_REQUEST = "@app/APP_PROFILE_REQUEST";
export const APP_PROFILE_SUCCESS = "@app/APP_PROFILE_SUCCESS";
export const APP_PROFILE_FAILURE = "@app/APP_PROFILE_FAILURE";
export function userProfile() {

    function requestAction() {
        return { type: APP_PROFILE_REQUEST }
    }
    function successAction(data: any) {
        return { type: APP_PROFILE_SUCCESS, payload: data }
    }
    function failedAction(error: any) {
        return { type: APP_PROFILE_FAILURE, error }
    }

    return (dispatch: ThunkDispatch<any, any, any>) => {
        dispatch(requestAction());
        dispatch(apiAction({
            data: {},
            method: "GET",
            url: "/api/dashboard/profile",
            onSuccess: (data, response) => {
                return successAction(data);
            },
            onFailure: (error) => {
                return (failedAction(error.message));
            },
        }));

    };
}
