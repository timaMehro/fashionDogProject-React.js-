import { ThemeProvider } from "@material-ui/styles";
import { jssPreset, StylesProvider } from '@material-ui/styles';
import { create } from 'jss';
import rtl from "jss-rtl";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { connect, Provider } from "react-redux";
import App from "./App";
import configureStore, { history } from "./redux/store/configureStore";
import themes from "./theme";

const ROOT_ELEMENT = "quantom";
const store = configureStore();

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const ConnectedThemeProvider = connect((state: any) => {
  return { theme: themes(state.app.theme.name, state.app.theme.isDark) };
})(({ theme, children}:any) => {
  return (
    <ThemeProvider theme={theme} >
      <StylesProvider jss={jss}>
        {children}
      </StylesProvider>
    </ThemeProvider>);
});

const renderApp = (RootComponent: any) => {
  ReactDOM.render(
    <AppContainer >
      <Provider store={store}>

        <ConnectedThemeProvider>
          <RootComponent history={history} />
        </ConnectedThemeProvider>


      </Provider>
    </AppContainer>,
    document.getElementById(ROOT_ELEMENT),
  );
};

renderApp(App);

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept("./App", () => {
    const RootComponent = require("./App").default;
    renderApp(RootComponent);
  });
}
