import * as actions from './ActionTypes';

export const filterRemoteOnsiteAll = () => ({
    type: actions.FILTER_BY_REMOTE_ONSITE_ALL
})

export const filterRemote = () => ({
    type: actions.FILTER_BY_REMOTE_ONLY
})

export const filterOnsite = () => ({
    type: actions.FILTER_BY_ONSITE_ONLY
})

export const clearFilters = () => ({
    type: actions.CLEAR_FILTERS
})

export const setFilters = (jobTitle, companyName, experience, location) => ({
    type: actions.FILTER_DATA,
    payload: {
        jobTitle,
        companyName,
        senorityLevel: experience,
        location
    }
})