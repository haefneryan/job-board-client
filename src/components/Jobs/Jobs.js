import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import JobCard from '../JobCard/JobCard';
import { setFilteredData, displayJobDescription } from '../../actions/filteredDataActions';
import { plusMinus } from '../../functions/plusMinus';
import { filterData } from '../../functions/filterData';
import { filtersInitialState } from '../../functions/filtersInitialState';

import './Jobs.css';
import { filterRemoteOnsiteAll } from '../../actions/filtersActions';

function Jobs(props) {
    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const { applyWindow, filteredData } = props;

    // useEffect(() => {
    //     console.log('filters changed')
    //     //console.log(state)
    //     // console.log(state.filters)
    //     // console.log(filterData(state))
    //     dispatch(setFilteredData(filterData(state)))
    // }, [state.filters]);

    return (
        <div className='posts'>
            <p>({state.filteredData.length})</p>
            {filteredData.map((job, index) => {
                return (
                    <JobCard key={job._id} job={job} plusMinus={plusMinus}>
                        {job.displayJobDescription ? 
                            <div>
                                <p className='jobDescription' id={index}>{job.jobDescription}</p>
                            </div> :
                            <></>
                        }
                        <button className='expandButton' title='Display Job Description' onClick={(e) => {plusMinus(e); dispatch(displayJobDescription(job))}}></button>
                        <button className='apply-button' onClick={() => applyWindow(job)}>APPLY</button>
                    </JobCard>
                )
            })}
        </div>
    )
}

export default Jobs
