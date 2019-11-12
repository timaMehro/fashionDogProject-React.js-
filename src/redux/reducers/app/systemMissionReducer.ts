import { Action, combineReducers } from "redux";
import {
    SYSTEM_MISSION_FILTER_SUCCESS, SYSTEM_MISSION_GETALL_FAILURE,
    SYSTEM_MISSION_GETALL_REQUEST,
    SYSTEM_MISSION_GETALL_SUCCESS,
} from "../../actions/app/systemMissionActions";

export function systemMission(state: systemMissionState = {
    pending: false,
    payload: { data: [], page: 1, limit: 10 },
    filter: [],
},
    action: any) {
    switch (action.type) {
        case SYSTEM_MISSION_FILTER_SUCCESS:
            return { ...state, filter: action.payload };
        case SYSTEM_MISSION_GETALL_REQUEST:
            return { ...state, pending: true };
        case SYSTEM_MISSION_GETALL_SUCCESS:
            return { ...state, pending: false, payload: action.payload };
        case SYSTEM_MISSION_GETALL_FAILURE:
            return { ...state, pending: false };

        default:
            return state;
    }
}

export interface systemMissionState {

    payload: any;
    pending?: boolean;
    filter?: any[];
    errorMessage?: string;
}
