import React from 'react';
import JobCard from './JobCard';

import './Jobs.css';

function Jobs(props) {
    const { filteredData, displayJobDescription, applyWindow } = props;

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
                return (
                    <JobCard key={job._id} job={job} plusMinus={plusMinus}>
                        {job.displayJobDescription ? 
                            <div>
                                <p className='jobDescription' id={index}>{job.jobDescription}</p>
                            </div> :
                            <></>
                        }
                        <button className='expandButton' title='Display Job Description' onClick={(e) => {displayJobDescription(job); plusMinus(e)}}></button>
                        <button className='apply-button' onClick={() => applyWindow(job)}>APPLY</button>
                    </JobCard>
                )
            })}
        </div>
    )
}

export default Jobs
