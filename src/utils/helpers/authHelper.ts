import { RouteComponentProps } from "react-router";


export type AuthorizeFunctionType = ((user?: any, match?: RouteComponentProps<any> ) => boolean);
export type AutorizeType = (string) | (string[]) | ({ roles?: string[], failMessage?: string });
export interface AppUser {
    firstname: string;
    lastname: string;
    avatar: string;
    roles?: string[];
}

export function authHeader() {
    // return authorization header with jwt token
    const token = localStorage.getItem("access_token");
    const tokentype = localStorage.getItem("access_token_type");
    if (token) {
        return { Authorization: `${tokentype || "Bearer"} ${token}` };
    } else {
        return {};
    }
}

export function getAccessToken() {
    // return authorization header with jwt token
    const accessToken = localStorage.getItem("access_token");
    const accessTokenType = localStorage.getItem("access_token_type");
    return {accessToken, accessTokenType};
}


export function authorized(options?: AutorizeType, user?: AppUser, match?: RouteComponentProps<any>) {
    // user?:any,path?: string, from?: string,
    if (!user) { return false; }

    let roles: string[] = [];

    if (typeof options === "string") {
        roles = [options];
    } else if (typeof options === "object") {
        if (Array.isArray(options)) {
            roles = options;
        } else {
            roles = (options as any).roles;
        }
    } else {

    }


    // check if route is restricted by role
    if (!user || !user.roles) {
        return false;
    }
    if (roles && roles.some((xx) => {
        return user.roles.indexOf(xx) > -1;
    })) {
        // role not authorised so redirect to home page
        return false;
    }

    return true;
}
export function getUser(): AppUser {
    const userItem = localStorage.getItem("user");
    if (!userItem) { return null; }
    try {
        const user = JSON.parse(userItem);
        return user;
    } catch (error) {
        return null;
    }

}

export function setUser(user: AppUser) {
    localStorage.setItem("user", JSON.stringify(user));
}

export function resetCred() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("access_token_type");
    localStorage.removeItem("user");
}
