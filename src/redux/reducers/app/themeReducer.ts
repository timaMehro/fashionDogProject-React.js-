import { THEME_CHANGE, THEME_CHANGE_MODE } from "../../actions/app/themeActions";


const initialState: ThemeState = { isDark: false, name: localStorage.getItem("app_theme") || "lotus" };
const theme = (state = initialState, action: any) => {
    if (action.type === THEME_CHANGE) {
        return { ...state, name: action.name };
    }
    if (action.type === THEME_CHANGE_MODE) {
        return { ...state, isDark: action.isDark };
    }
    return { ...state };
};

export default theme;
export interface ThemeState {
    name: string;
    isDark: boolean;
}