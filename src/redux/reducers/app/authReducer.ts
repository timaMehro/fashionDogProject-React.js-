import { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE, LOGOUT_SUCCESS } from "../../actions/app/authActions";



export function auth(state: AuthState = {
    pending: false,
    isAuthenticated: localStorage.getItem("access_Token") ? true : false,
}, action: any) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                pending: true,
                isAuthenticated: false,
                user: action.creds,
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                pending: false,
                isAuthenticated: true,
                errorMessage: "",
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                pending: false,
                isAuthenticated: false,
                errorMessage: action.message,
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                pending: true,
                isAuthenticated: false,
            });
        default:
            return state;
    }
}
export interface AuthState {
    isAuthenticated?: boolean;
    pending?: boolean;
    errorMessage?: string;
}
