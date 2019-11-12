import { LOCATION_CHANGE, push } from "react-router-redux";
import { logoutUser } from "../actions/app/authActions";



const isAuthorize = true;
export const authorizeMiddleware = ({ dispatch }: { dispatch: any }) => (next: any) => (action: any) => {

    if (action) {
        if (action.type === LOCATION_CHANGE) {
            const p = action.payload.location.pathname;
            if (!isAuthorize || p.startsWith("/admin/administration/users")) {
                dispatch(logoutUser());
                next(push("/"));
            }
        } else {
            next(action);
        }
    } else {
        return;
    }
};
