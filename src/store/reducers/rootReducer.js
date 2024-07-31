import { combineReducers } from "redux";
import { ticketSlice } from "./ticketReducer";

// import { ticketsApi } from "../api/api";


const rootReducer = combineReducers({
    // [ticketsApi.reducerPath]:ticketsApi.reducer
    tickets: ticketSlice.reducer,
    // check: checkReducer

});

export default rootReducer;




