import * as actions from '../actions/ActionTypes';

export default function fetchDataReducer (state = [], action) {
    if (action.type === actions.FETCH_DATA_SUCCESS) {
        return action.payload.data
    } else {
        return state
    }
}