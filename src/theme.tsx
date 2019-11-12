import { createMuiTheme } from "@material-ui/core";

const lotusLightTheme = createMuiTheme({
    direction: "rtl",
    palette: {
        primary: {
            light: "#f5d657",
            main: "#f3cc2e",
            dark: "#aa8e20",
            contrastText: "#fff",
        },
        secondary: {
            light: "#525e62",
            main: "#27363b",
            dark: "#1b2529",
            contrastText: "#fff",
        },
        text: {
            primary: "#000",
            secondary: "#607d8b",
            disabled: "#f0f0f0",
            hint: "#fd0",
        },
        background: {
            default: "#e4e4e3",
            paper: "#fff",
        },
    },
    typography: {
        fontFamily: [
            "vazir",
            "sans-serif",
        ].join(","),
    },
});
const lotusDarkTheme = createMuiTheme({
    direction: "rtl",
    palette: {
        primary: {
            light: "#4b9fea",
            main: "#252b38",
            dark: "#272727",
            contrastText: "#fff",
        },
        secondary: {
            light: "#61646d",
            main: "#cc770b",
            dark: "#414348",
            contrastText: "#fff",
        },
        text: {
            primary: "#fff",
            secondary: "#8999a0",
            disabled: "#fff",
            hint: "#fff",
        },
        background: {
            default: "#2f2f2f",
            paper: "#424242",
        },
    },
    typography: {
        fontFamily: [
            "vazir",
            "sans-serif",
        ].join(","),
    },

});

const mythemes: any = { lotus: { light: lotusLightTheme, dark: lotusDarkTheme } };

const themes = (name: string, isDark?: boolean) => (isDark ? mythemes[name].dark : mythemes[name].light);
export default themes;
