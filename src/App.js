import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AllJobPosts from './pages/AllJobPosts';
import CreateJobPost from './pages/CreateJobPost';
import UpdateJobPost from './pages/UpdateJobPost';
import Nav from './components/Nav';

import { filtersDefaultState } from './components/functions/filtersDefaultState';

import './App.css';

function App() {
  const url = 'https://job-board-server-haefneryan.herokuapp.com/';
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [filters, setFilters] = useState(filtersDefaultState)
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(`${url}posts`)
      setData(result.data)
      setFilteredData(result.data)
      console.log(result.data)
    }
    getData();
  }, [])

  useEffect(() => {
    if (data !== null) {
      console.log(data)
      data.forEach(x => {
        return (
          x.editingMode = false,
          x.displayJobDescription = false
        )
      })
    }
  }, [data]);
  
  useEffect(() => {
    if (data !== null) {
      let result = data;
      if (filters.jobTitle.length > 0) {
        result = result.filter((x) => {
          let title = x.jobTitle.toLowerCase()
          if (title.includes(`${filters.jobTitle}`)) {
            return x;
          } else { return null }
        })
      }
      if (filters.companyName.length > 0) {
        result = result.filter((x) => {
          let company = x.companyName.toLowerCase();
          if (company.includes(`${filters.companyName}`)) {
            return x;
          } else { return null }
        })
      }
      if (filters.senorityLevel.length > 0) {
        result = result.filter((x) => {
          let senority_Level = x.senorityLevel.toLowerCase();
          if (senority_Level === filters.senorityLevel) {
            return x;
          } else { return null }
        })
      }
      if (filters.location.length > 0) {
        result = result.filter((x) => {
          let location = x.location.toLowerCase();
          if (location === filters.location) {
            return x;
          } else { return null }
        })
      }
      if (filters.remote === true) {
        result = result.filter((x) => {
          if (x.remote === filters.remote) {
            return x;
          } else { return null }
        })
      }
      if (filters.onsite === true) {
        result = result.filter((x) => {
          if (!x.location.includes('Remote')) {
            return x;
          } else { return null }
        })
      }
      if (filters.jobTitle.length === 0 && filters.companyName.length === 0 && filters.senorityLevel.length === 0 && filters.location.length === 0 && filters.remote === false && filters.onsite === false) {
        setFilteredData(data)
      } else {
        setFilteredData(result)
      }
    }
  }, [data, filters])

  const filter = () => {
    setFilters({
      ...filters,
      jobTitle: document.getElementById('jobTitle').value,
      companyName: document.getElementById('companyName').value,
      senorityLevel: document.getElementById('experience').value,
      location: document.getElementById('location').value
    })
  }

  const filterRemote = () => {
    if (document.getElementById('all').checked) {
      setFilters({
        ...filters,
        remote: false,
        onsite: false
      })
    } else if (document.getElementById('remoteOnly').checked) {
      setFilters({
        ...filters,
        remote: true,
        onsite: false
      })
    } else if (document.getElementById('onSiteOnly').checked) {
      setFilters({
        ...filters,
        remote: false,
        onsite: true
      })
    }
  }

  const clearFilters = () => {
    setFilters({ jobTitle: '', companyName: '', senorityLevel: '', location: '', remote: false, onsite: false });
    document.getElementById('jobTitle').value = '';
    document.getElementById('companyName').value = '';
    document.getElementById('experience').value = '';
    document.getElementById('all').checked = true;
    document.getElementById('location').value = '';
  }

  const paginate = (number) => {
    setCurrentPage(number)
  }

  const displayJobDescription = (job) => {
    if(job.displayJobDescription) {
      setFilteredData([...filteredData, filteredData[filteredData.indexOf(job)].displayJobDescription = false])
    } else {
      setFilteredData([...filteredData, filteredData[filteredData.indexOf(job)].displayJobDescription = true])
    }
  }
  
  const editJob = (job) => {
    if(job.editingMode) {
      let r = (window.confirm('Are you sure you want to make these changes?'))
      if (r) {
        axios.put(`${url}posts/${job._id}`, { 
          jobTitle: document.getElementById(`editedJobTitle_${data.indexOf(job)}`).value,
          companyName: document.getElementById(`editedCompanyName_${data.indexOf(job)}`).value,
          senorityLevel: document.getElementById(`editedSenorityLevel_${data.indexOf(job)}`).value,
          location: document.getElementById(`editedLocation_${data.indexOf(job)}`).value,
          jobDescription: document.getElementById(`editedJobDescription_${data.indexOf(job)}`).value
        })
        setFilteredData([...filteredData, 
          filteredData[filteredData.indexOf(job)].jobTitle = document.getElementById(`editedJobTitle_${data.indexOf(job)}`).value,
          filteredData[filteredData.indexOf(job)].companyName = document.getElementById(`editedCompanyName_${data.indexOf(job)}`).value,
          filteredData[filteredData.indexOf(job)].senorityLevel = document.getElementById(`editedSenorityLevel_${data.indexOf(job)}`).value,
          filteredData[filteredData.indexOf(job)].location = document.getElementById(`editedLocation_${data.indexOf(job)}`).value,
          filteredData[filteredData.indexOf(job)].jobDescription = document.getElementById(`editedJobDescription_${data.indexOf(job)}`).value,
          filteredData[filteredData.indexOf(job)].editingMode = false
        ])
      }
    } else {
      setFilteredData([...filteredData, filteredData[filteredData.indexOf(job)].editingMode = true ])
    }
  }

  const cancelEditJob = (job) => {
    setFilteredData([...filteredData, filteredData[filteredData.indexOf(job)].editingMode = false ])
  }

  if (data !== null && filteredData !== null) {

    return (
      <div className="App">
        <Nav />
        <Routes>
          <Route exact path='/' element={<AllJobPosts data={data} filteredData={filteredData} currentPage={currentPage} postsPerPage={postsPerPage} filter={filter} filterRemote={filterRemote} clearFilters={clearFilters} paginate={paginate} displayJobDescription={displayJobDescription}/>}/>
          <Route exact path='/post-job' element={<CreateJobPost />}/>
          <Route exact path='/update-job' element={<UpdateJobPost data={data} editJob={editJob} cancelEditJob={cancelEditJob}/>}/>
        </Routes>
      </div>
    );
  } else {
    return (
      <div>
        <p>loading...</p>
      </div>
    )
  }
}

export default App;
