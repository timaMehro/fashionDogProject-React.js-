export const THEME_CHANGE = "@tracker/THEME_CHANGE"
export const THEME_CHANGE_MODE = "@tracker/THEME_CHANGE_MODE"
export function changeMode(isDark: boolean) {
    return {
        type: THEME_CHANGE_MODE,
        isDark,
    };
}
export function changeTheme(name: string) {
    localStorage.setItem("app_theme", name);
    return {
        type: changeTheme,
        name,
    };
}
