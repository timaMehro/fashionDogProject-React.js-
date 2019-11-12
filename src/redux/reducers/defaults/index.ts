import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { defaults, DefaultState } from "./defaultReducer";
// import counterReducer from './counter'

const defaultsReducer = () => combineReducers({

  defaults,
});

export interface DefaultsState {

  defaults: DefaultState;
}

export default defaultsReducer;
