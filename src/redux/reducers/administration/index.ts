import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { transactions, transactionsState } from "./systemTransactionsRediucer";

// import counterReducer from './counter'

const AdministrationReducer = () => combineReducers({
    transactions,
});

export interface AdministrationState {

    transactions: transactionsState
}

export default AdministrationReducer;
