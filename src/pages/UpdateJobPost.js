import React, { useState } from 'react';
import JobCard from '../components/JobCard';

import './UpdateJobPost.css'

function UpdateJobPost(props) {
    const { data, editJob, cancelEditJob } = props;
    const [ displayedPosts, setDisplayedPosts ] = useState([])

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Enter') {
            searchForJob();
        }
    })

    const searchForJob = () => {
        setDisplayedPosts([])
        let res = document.getElementById('companyNameSearch').value
        data.forEach(x => {
            if (x.companyName.toLowerCase().includes(`${res.toLowerCase()}`)) {
                setDisplayedPosts(displayedPosts => displayedPosts.concat(x))
            }
        })
    }

    let index = 0
    return (
        <div className='updateJobPost'>
            <h2>Update Job Post</h2>
            Enter Company Name:
            <input className='companyNameSearch' id='companyNameSearch'></input><button className='submitBtn' onClick={() => searchForJob()}>Submit</button>
            <p>Results ({displayedPosts.length}):</p>
            {displayedPosts.map(job => {
                index++;
                return (
                    <JobCard key={job._id} index={index} data={data} job={job}>
                        {job.editingMode ? 
                            <>
                                <button className='editButton btn' onClick={() => editJob(job)}>SUBMIT</button>
                                <button className='cancelButton btn' onClick={() => cancelEditJob(job)}>CANCEL</button>
                            </> : 
                            <>
                                <button className='editButton btn' onClick={() => editJob(job)}>EDIT</button>
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
