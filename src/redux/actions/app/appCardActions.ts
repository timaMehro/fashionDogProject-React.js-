import { ThunkDispatch } from "redux-thunk";
import { apiAction } from "./apiActions";
export const APP_FILTER_OPEN = "@app/APP_FILTER_OPEN";


export function appCardFilter(open: boolean) {
    return {
        type: APP_FILTER_OPEN,
        open,

    };
}

