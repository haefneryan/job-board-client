import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editJob, cancelEditJob, submitEditJob } from '../actions/filteredDataActions';
import { updateJobDB } from '../functions/updateJob';
import JobCard from '../components/JobCard/JobCard';

import './UpdateJobPost.css'

function UpdateJobPost() {
    document.title = 'RH Job Board - Update Job'
    const state = useSelector(state => state.data)
    const dispatch = useDispatch();
    const [ displayedPosts, setDisplayedPosts ] = useState([])

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Enter') {
            searchForJob();
        }
    })

    const searchForJob = () => {
        setDisplayedPosts([])
        let res = document.getElementById('companyNameSearch').value
        state.forEach(x => {
            if (x.companyName.toLowerCase().includes(`${res.toLowerCase()}`)) {
                setDisplayedPosts(displayedPosts => displayedPosts.concat(x))
            }
        })
    }

    return (
        <div className='updateJobPost'>
            <h2>Update Job Post</h2>
            Enter Company Name:
            <input className='companyNameSearch' id='companyNameSearch'></input><button className='submitBtn' onClick={() => searchForJob()}>Submit</button>
            <p>Results ({displayedPosts.length}):</p>
            {displayedPosts.map(job => {
                return (
                    <JobCard key={job._id} job={job}>
                        {job.editingMode ? 
                            <>
                                <button className='submitButton btn' onClick={() => {updateJobDB(state, job); dispatch(submitEditJob(state, job))}}>SUBMIT</button>
                                <button className='cancelButton btn' onClick={() => dispatch(cancelEditJob(job))}>CANCEL</button>
                            </> : 
                            <>
                                <button className='editButton btn' onClick={() => {dispatch(editJob(job))}}>EDIT</button>
                                <p className='jobDescription'>{job.jobDescription}</p>
                            </>
                        }
                    </JobCard>
                )
            })}
        </div>
    )
}

export default UpdateJobPost;