import React, { useEffect } from 'react';

import { classes } from './Jobs.css';

function Jobs(props) {
    const { filteredData, apply } = props;

    filteredData.forEach(job => {
        job.displayJobDescription = false
    });

    const displayJobDescription = (index) => {
        document.getElementById(index).classList.toggle('jobDescription');
    }

    const plusMinus = (e) => {
        if (getComputedStyle(e.target).getPropertyValue('--minus') === 'none') {
          e.target.style.setProperty('--minus', 'block')
        } else {
          e.target.style.setProperty('--minus', 'none')
        }
      }

    return (
        <div className='posts'>
            {filteredData.map((job, index) => {
                if (job.active === true) {
                    return (
                        <div className='job' key={index}>
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
                                    {job.remote ? <p className='info location'>(Remote)</p> : <p className='info location'>(On-site)</p>}
                                </div>
                            </div>
                            
                            <p className='datePosted'>Date posted: {job.datePosted}</p>
                            <p>{job.remote}</p>
                            <div>
                                <p className='jobDescription' id={index}>{job.jobDescription}</p>
                            </div>
                            
                            <button className='expandButton' title='Display Job Description' onClick={(e) => {displayJobDescription(index); plusMinus(e)}}></button>
                            <button className='apply-button' onClick={() => apply()}>APPLY</button>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default Jobs
