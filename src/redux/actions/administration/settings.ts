import { Dispatch } from "redux";
import { GetAllDataOptions } from "../../../utils/types";
import { apiAction } from "../app/apiActions";

export const SETTINGS_GETALL_REQUEST = "@app/SETTINGS_GETALL_REQUEST";
export const SETTINGS_GETALL_SUCCESS = "@app/SETTINGS_GETALL_SUCCESS";
export const SETTINGS_GETALL_FAILURE = "@app/SETTINGS_GETALL_FAILURE";

export function getAll(options?: GetAllDataOptions) {


    return (dispatch: Dispatch) => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(request());
        dispatch(apiAction({
            data: options,
            method: "GET",
            url: "/api/configuration/settings/transactions",
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


    function request() { return { type: SETTINGS_GETALL_REQUEST }; }
    function success(payload: any) { return { type: SETTINGS_GETALL_SUCCESS, payload }; }
    function failure(error: any) { return { type: SETTINGS_GETALL_FAILURE, error }; }

}



