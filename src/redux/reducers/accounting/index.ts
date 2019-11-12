import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { personalAccount, personalAccountState } from "./personalAccountReducer";

const personalAccountReducer = () => combineReducers({

  personalAccount,
});

export interface personalAccountState {

  personalAccount: personalAccountState;
}

export default personalAccountReducer;
