import { string } from "prop-types";

export const API = "@app/API";
export const API_START = "@app/API_START";
export const API_END = "@app/API_END";
export const ACCESS_DENIED = "@app/ACCESS_DENIED";
export const API_ERROR = "@app/API_ERROR";

export const apiStart = (label: string) => ({
    type: API_START,
    payload: label,
});

export const apiEnd = (label: string) => ({
    type: API_END,
    payload: label,
});

export const accessDenied = (url: string) => ({
    type: accessDenied,
    payload: url,
});

export const apiError = (error: Error | string) => ({
    type: API_ERROR,
    error,
});


export function apiAction({
    url = "",
    method = "GET",
    data = null,
    accessToken = null,
    onSuccess = () => { },
    onFailure = () => { },
    label = "",
    headersOverride = null,
}: {
    url?: string;
    method?: string;
    data?: any;
    accessToken?: any;
    onSuccess?: (data?: any, response?: Response) => void;
    onFailure?: (error: Error) => void;
    label?: string;
    headersOverride?: any;
}) {
    return {
        type: API,
        payload: {
            url,
            method,
            data,
            accessToken,
            onSuccess,
            onFailure,
            label,
            headersOverride,
        },
    };
}
