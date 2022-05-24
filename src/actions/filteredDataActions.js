import * as actions from './ActionTypes';

export const setInitialFilteredData = (data) => ({
    type: actions.SET_INITIAL_FILTERED_DATA,
    payload: data
})

export const setFilteredData = (data) => ({
    type: actions.FILTER_DATA_REMOTE,
    payload: data
})

export const displayJobDescription = (job) => ({
    type: actions.DISPLAY_JOB_DESCRIPTION,
    payload: job
})

export const editJob = (job) => ({
    type: actions.EDIT_JOB,
    payload: job
})

export const cancelEditJob = (job) => ({
    type: actions.CANCEL_EDIT_JOB,
    payload: job
})

export const submitEditJob = (state, job) => ({
    type: actions.SUBMIT_EDIT_JOB,
    payload: {
        job: job,
        jobTitle: document.getElementById(`editedJobTitle_${state.indexOf(job)}`).value,
        companyName: document.getElementById(`editedCompanyName_${state.indexOf(job)}`).value,
        senorityLevel: document.getElementById(`editedSenorityLevel_${state.indexOf(job)}`).value,
        location: document.getElementById(`editedLocation_${state.indexOf(job)}`).value,
        jobDescription: document.getElementById(`editedJobDescription_${state.indexOf(job)}`).value
    }
})