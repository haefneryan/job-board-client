import React, { useState } from 'react';

import Jobs from '../components/Jobs';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import ApplyForm from '../components/ApplyForm';

import './AllJobPosts.css';

function AllJobPosts(props) {
    const { data, filteredData, currentPage, postsPerPage, filter, filterRemote, clearFilters, paginate, displayJobDescription } = props;
    const [ displayApplyWindow, setDisplayApplyWindow] = useState(false)
    const [ currentJob, setCurrentJob ] = useState({})

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);
    

    const applyWindow = (job) => {
        console.log('apply')
        console.log(job)
        setCurrentJob(job)
        setDisplayApplyWindow(true)
    }

    const closeApplyWindow = () => {
        setCurrentJob({})
        setDisplayApplyWindow(false)
    }

    return (
        <>
            {displayApplyWindow ? <ApplyForm currentJob={currentJob} closeApplyWindow={closeApplyWindow}/> : <></>}
            <p className='jobsinfo'>Viewing Jobs ({indexOfFirstPost + 1}) - ({Math.min(indexOfLastPost, filteredData.length)}) of ({filteredData.length}) Jobs</p>
            <div className='job-container'>
                <Filters filter={filter} filterRemote={filterRemote} clearFilters={clearFilters} data={data}/>
                {filteredData.length === 0 ? <p className='text'>-- No Jobs --</p> : <Jobs filteredData={currentPosts} displayJobDescription={displayJobDescription} applyWindow={applyWindow}/>}
            </div>
            <Pagination postsPerPage={postsPerPage} totalPosts={filteredData.length} currentPage={currentPage} paginate={paginate}/>
        </>
    )
}

export default AllJobPosts;