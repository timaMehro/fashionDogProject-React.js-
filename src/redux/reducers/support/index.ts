import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { tickets, ticketsState } from "./ticketsReducer";
// import counterReducer from './counter'

const supportReducer = () => combineReducers({

  tickets,
});

export interface supportReducerState {

  tickets: ticketsState;
}

export default supportReducer;
