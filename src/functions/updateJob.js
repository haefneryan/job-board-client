import axios from "axios"
import { url } from "./url"

export const updateJobDB = (state, job) => {
    axios.put(`${url}posts/${job._id}`, { 
        jobTitle: document.getElementById(`editedJobTitle_${state.indexOf(job)}`).value,
        companyName: document.getElementById(`editedCompanyName_${state.indexOf(job)}`).value,
        senorityLevel: document.getElementById(`editedSenorityLevel_${state.indexOf(job)}`).value,
        location: document.getElementById(`editedLocation_${state.indexOf(job)}`).value,
        jobDescription: document.getElementById(`editedJobDescription_${state.indexOf(job)}`).value
    })
}