
import { History } from "history";
import { combineReducers } from "redux";
import appCardFilter from "./appCardReducer";
import { auth, AuthState } from "./authReducer";
import drawer from "./drawerReducer";
import notification, { NotificationState } from "./notificationReducer";
import systemDriver from "./systemDriverReducer";
import { systemMission } from "./systemMissionReducer";
import systemStatus from "./systemStatusReducer";
import theme, { ThemeState } from "./themeReducer";
import userNotification from "./userNotificationReducer";
import appProfile, { AppProfile } from "./appProfileReducer";
import appbar, { AppbarStates } from "./appBarReducer";
import userMail, { MailState } from "./userEmailReducer";




const appReducer = (history: History) => combineReducers({
    auth,
    theme,
    appbar,
    drawer,
    notification,
    userNotification,
    userMail,
    appProfile,
    appCardFilter,
    systemStatus,
    systemDriver,
    systemMission,
});

export interface AppState {
    auth: AuthState;
    appbar: AppbarStates,
    theme: ThemeState;
    notifications: NotificationState;
    appProfile: AppProfile;
    userMail: MailState;
}
export default appReducer;
