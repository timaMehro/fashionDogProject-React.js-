import { APP_PROFILE_SUCCESS } from "../../actions/app/appProfileActions";

export interface AppProfile {
    payload: any;
}

const initialState: AppProfile = { payload: null };

const appProfile = (state = initialState, action: any) => {
    switch (action.type) {
        case APP_PROFILE_SUCCESS:
            return { ...state, payload: action.payload };
        default:
            return { ...state };
    }
}





export default appProfile;
