import React from 'react';

import './JobCard.css'

function JobCard(props) {
    const { job, data } = props

    return (
        <div className='job'>
            {job.editingMode ? 
                <>
                    <input className='jobTitle' id={`editedJobTitle_${data.indexOf(job)}`} defaultValue={job.jobTitle}></input>
                    <p className='editDescription'>(Job Title)</p>
                    <div className='jobInfo'>
                        <div>
                            <input className='info' id={`editedCompanyName_${data.indexOf(job)}`} defaultValue={job.companyName}></input>
                            <p className='editDescription'>(Company Name)</p>
                        </div>
                        <div>
                            <p className='info'>|</p>
                        </div>
                        <div>
                            <input className='info' id={`editedSenorityLevel_${data.indexOf(job)}`} defaultValue={job.senorityLevel}></input>
                            <p className='editDescription'>(Experience)</p>
                        </div>
                        <div>
                            <p className='info'>|</p>
                        </div>
                        <div>
                            <input className='info' id={`editedLocation_${data.indexOf(job)}`} defaultValue={job.location}></input>
                            <p className='editDescription'>(Location)</p>
                        </div>
                    </div>
                    
                    <p className='datePosted'>Date posted: {job.datePosted}</p>
                    <div>
                        <textarea className='jobDescription' id={`editedJobDescription_${data.indexOf(job)}`} defaultValue={job.jobDescription}></textarea>
                        <p className='editDescription'>(Job Description)</p>
                    </div>
                    {props.children}
                </>
                :
                <>
                    <h2 className='jobTitle'>{job.jobTitle}</h2>
                    <div className='jobInfo'>
                        <div>
                            <p className='info'>{job.companyName}</p>
                        </div>
                        <div>
                            <p className='info'>|</p>
                        </div>
                        <div>
                            <p className='info'>{job.senorityLevel}</p>
                        </div>
                        <div>
                            <p className='info'>|</p>
                        </div>
                        <div>
                            <p className='info'>{job.location}</p>
                            {job.remote ? '' : <p className='info location'>(On-site)</p>}
                        </div>
                    </div>
                    
                    <p className='datePosted'>Date posted: {job.datePosted}</p>
                    {props.children}
                </>
            }
        </div>
    )
}

export default JobCard;
