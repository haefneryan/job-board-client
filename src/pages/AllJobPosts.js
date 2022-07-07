import React, { useState } from "react";
import { useSelector } from "react-redux";
import Jobs from "../components/Jobs/Jobs";
import Filters from "../components/Filters/Filters";
import Pagination from "../components/Pagination/Pagination";
import ApplyForm from "../components/ApplyForm/ApplyForm";

import "./AllJobPosts.css";

function AllJobPosts() {
  document.title = "RH Job Board - All Jobs";
  const state = useSelector((state) => state);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayApplyWindow, setDisplayApplyWindow] = useState(false);
  const [currentJob, setCurrentJob] = useState({});
  const postsPerPage = 5;

  const paginate = (number) => {
    setCurrentPage(number);
  };

  const applyWindow = (job) => {
    setCurrentJob(job);
    setDisplayApplyWindow(true);
  };

  const closeApplyWindow = () => {
    setCurrentJob({});
    setDisplayApplyWindow(false);
  };

  if (state.data !== null) {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = state.filteredData.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    return (
      <>
        {displayApplyWindow ? (
          <ApplyForm
            currentJob={currentJob}
            closeApplyWindow={closeApplyWindow}
          />
        ) : (
          <></>
        )}
        <p className="jobsinfo">
          Viewing Jobs ({indexOfFirstPost + 1}) - (
          {Math.min(indexOfLastPost, state.filteredData.length)}) of (
          {state.filteredData.length}) Jobs
        </p>
        <div className="job-container">
          <Filters />
          {state.filteredData.length === 0 ? (
            <p className="text">-- No Jobs --</p>
          ) : (
            <Jobs filteredData={currentPosts} applyWindow={applyWindow} />
          )}
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={state.filteredData.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </>
    );
  } else {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }
}

export default AllJobPosts;
