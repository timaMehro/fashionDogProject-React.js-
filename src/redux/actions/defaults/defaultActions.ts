import { Dispatch } from "redux";
import { GenerateReportFileOptions, GetAllDataOptions } from "../../../utils/types";
import { apiAction } from "../app/apiActions";

export const DEFAULT_GETALL_REQUEST = "@ccr/DEFAULT_GETALL_REQUEST";
export const DEFAULT_GETALL_SUCCESS = "@ccr/DEFAULT_GETALL_SUCCESS";
export const DEFAULT_GETALL_FAILURE = "@ccr/DEFAULT_GETALL_FAILURE";

export function getAll(options?: GetAllDataOptions) {


    return (dispatch: Dispatch) => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(request());
        dispatch(apiAction({
            data: options,
            method: "GET",
            url: "/api/dm/default",
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


    function request() { return { type: DEFAULT_GETALL_REQUEST }; }
    function success(payload: any) { return { type: DEFAULT_GETALL_SUCCESS, payload }; }
    function failure(error: any) { return { type: DEFAULT_GETALL_FAILURE, error }; }

}



