import { ThunkDispatch } from "redux-thunk";

import { apiAction } from "./apiActions";

export const APP_BAR_REQUEST = "@app/APP_BAR_REQUEST";
export const APP_BAR_SUCCESS = "@app/APP_BAR_SUCCESS";
export const APP_BAR_FAILURE = "@app/APP_BAR_FAILURE";
export function appbar() {

    function requestAction() {
        return { type: APP_BAR_REQUEST }
    }
    function successAction(data: any) {
        return { type: APP_BAR_SUCCESS, payload: data }
    }
    function failedAction(error: any) {
        return { type: APP_BAR_FAILURE, error }
    }

    return (dispatch: ThunkDispatch<any, any, any>) => {
        dispatch(requestAction());
        dispatch(apiAction({
            data: {},
            method: "GET",
            url: "/api/dashboard/appbar",
            onSuccess: (data, response) => {
                return successAction(data);
            },
            onFailure: (error) => {
                return (failedAction(error.message));
            },
        }));

    };
}
