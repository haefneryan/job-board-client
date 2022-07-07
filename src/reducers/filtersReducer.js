import * as filterActions from "../actions/ActionTypes";
import { filtersInitialState } from "../functions/filtersInitialState";

export default function filterReducer(state = filtersInitialState, action) {
  if (action.type === filterActions.FILTER_BY_REMOTE_ONSITE_ALL) {
    return {
      ...state,
      remote: false,
      onsite: false,
    };
  } else if (action.type === filterActions.FILTER_BY_REMOTE_ONLY) {
    return {
      ...state,
      remote: true,
      onsite: false,
    };
  } else if (action.type === filterActions.FILTER_BY_ONSITE_ONLY) {
    return {
      ...state,
      remote: false,
      onsite: true,
    };
  } else if (action.type === filterActions.FILTER_DATA) {
    return {
      ...state,
      jobTitle: action.payload.jobTitle,
      companyName: action.payload.companyName,
      senorityLevel: action.payload.senorityLevel,
      location: action.payload.location,
    };
  } else if (action.type === filterActions.CLEAR_FILTERS) {
    return state;
  } else {
    return filtersInitialState;
  }
}
