import { connectRouter } from "connected-react-router";
import { History } from "history";
import { RouterState } from "react-router-redux";
import { combineReducers } from "redux";
import AdministrationReducer, { AdministrationState } from "./administration";
import appReduce, { AppState } from "./app/index";
import defaultsReducer, { DefaultsState } from "./defaults";
import supportReducer, { supportReducerState } from "./support";
import personalAccountReducer from "./accounting";
import { personalAccountState } from "./accounting/personalAccountReducer";
import productReducer from "./product";
import { productState } from "./product";
// import counterReducer from './counter'

const rootReducer = (history: History) => combineReducers({
  app: appReduce(history),
  default: defaultsReducer(),
  accounting: personalAccountReducer(),
  product: productReducer(),
  support: supportReducer(),
  administration: AdministrationReducer(),
  router: connectRouter(history),

});

export interface RootState {
  app: AppState;
  default: DefaultsState;
  accounting: personalAccountState,
  product: productState,
  support: supportReducerState,
  administration: AdministrationState;
  router: RouterState;
}

export default rootReducer;
