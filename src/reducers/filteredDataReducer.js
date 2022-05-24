import * as actions from '../actions/ActionTypes';

export default function filteredDataReducer (state = [], action) {
    if (action.type === actions.SET_INITIAL_FILTERED_DATA) {
        return action.payload.data
    } else if (action.type === actions.FILTER_DATA_REMOTE) {
        return action.payload
    } else if (action.type === actions.DISPLAY_JOB_DESCRIPTION) {
        const newArray = [...state]
        const index = state.indexOf(action.payload)
        newArray[index].displayJobDescription = !newArray[index].displayJobDescription
        return [...newArray]
    } else if (action.type === actions.EDIT_JOB) {
        const newArray = [...state]
        const index = state.indexOf(action.payload)
        newArray[index].editingMode = true
        return [...newArray]
    } else if (action.type === actions.CANCEL_EDIT_JOB) {
        const newArray = [...state]
        const index = state.indexOf(action.payload)
        newArray[index].editingMode = false
        return [...newArray]
    } else if (action.type === actions.SUBMIT_EDIT_JOB) {
        const newArray = [...state]
        const index = state.indexOf(action.payload.job)
        newArray[index].jobTitle = action.payload.jobTitle
        newArray[index].companyName = action.payload.companyName
        newArray[index].senorityLevel = action.payload.senorityLevel
        newArray[index].location = action.payload.location
        newArray[index].jobDescription = action.payload.jobDescription
        newArray[index].editingMode = false
        return [...newArray]
    } else {
        return state
    }
}