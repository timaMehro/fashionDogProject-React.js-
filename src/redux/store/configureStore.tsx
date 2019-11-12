import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import apiMiddleware from "../middlware/apiMiddleware";
import createRootReducer from "../reducers";

export const history = createBrowserHistory();
const loggerMiddleware = createLogger();

export default function configureStore(preloadedState?: any) {
  const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancer(
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        routerMiddleware(history),
        apiMiddleware,

      ),
    ),
  );

  // Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  return store;
}
