import { combineReducers } from "redux";
import fetchDataReducer from "./fetchDataReducer";
import filteredDataReducer from "./filteredDataReducer";
import filterReducer from "./filtersReducer";

const allReducers = combineReducers({
    data: fetchDataReducer,
    filteredData: filteredDataReducer,
    filters: filterReducer
})

export default allReducers;