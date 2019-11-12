import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { factor, factorState } from "./factorReducer";
import { list, listState } from "./listReducer";
import { rm, rmOperationsState } from "./rmOperationsReducer";

const productReducer = () => combineReducers({

  factor,
  list,
  rm,
});

export interface productState {

  factor: factorState;
  list: listState;
  rm: rmOperationsState;
}

export default productReducer;
