import { ThunkDispatch } from "redux-thunk";

import { apiAction } from "./apiActions";

export const DRAWER_OPEN = "@tracker/DRAWER_OPEN";
export const DRAWER_REQUEST = "@app/DRAWER_REQUEST";
export const DRAWER_SUCCESS = "@app/DRAWER_SUCCESS";
export const DRAWER_FAILURE = "@app/DRAWER_FAILURE";
export function drawer(open: boolean) {
    return {
        type: DRAWER_OPEN,
        open,

    };
}
export function getAll() {

    function requestAction() {
        return { type: DRAWER_REQUEST }
    }
    function successAction(data: any) {
        return { type: DRAWER_SUCCESS, payload: data }
    }
    function failedAction(error: any) {
        return { type: DRAWER_FAILURE, error }
    }

    return (dispatch: ThunkDispatch<any, any, any>) => {
        dispatch(requestAction());
        dispatch(apiAction({
            data: {},
            method: "GET",
            url: "/api/dashboard/navigation",
            onSuccess: (data, response) => {
                return successAction(data);
            },
            onFailure: (error) => {
                return (failedAction(error.message));
            },
        }));

    };
}
