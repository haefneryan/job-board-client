import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';
import Jobs from './components/Jobs';
import Filters from './components/Filters';
import CreateJobPost from './pages/CreateJobPost';

import axios from 'axios';

function App() {
  const url = 'https://job-board-server-haefneryan.herokuapp.com/';
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [filters, setFilters] = useState({
    jobTitle: '',
    companyName: '',
    senorityLevel: '',
    location: '',
    remote: false,
    onsite: false
  })
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

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
      let result = data;
      if (filters.jobTitle.length > 0) {
        result = result.filter((x) => {
          let title = x.jobTitle.toLowerCase()
          if (title.includes(`${filters.jobTitle}`)) {
            return x;
          }
        })
      }
      if (filters.companyName.length > 0) {
        result = result.filter((x) => {
          let company = x.companyName.toLowerCase();
          if (company.includes(`${filters.companyName}`)) {
            return x;
          }
        })
      }
      if (filters.senorityLevel.length > 0) {
        result = result.filter((x) => {
          let senority_Level = x.senorityLevel.toLowerCase();
          if (senority_Level === filters.senorityLevel) {
            return x;
          }
        })
      }
      if (filters.location.length > 0) {
        result = result.filter((x) => {
          let location = x.location.toLowerCase();
          if (location === filters.location) {
            return x;
          }
        })
      }
      if (filters.remote === true) {
        result = result.filter((x) => {
          if (x.remote === filters.remote) {
            return x;
          }
        })
      }
      if (filters.onsite === true) {
        result = result.filter((x) => {
          if (!x.location.includes('Remote')) {
            return x;
          }
        })
      }
      if (filters.jobTitle.length === 0 && filters.companyName.length === 0 && filters.senorityLevel.length === 0 && filters.location.length === 0 && filters.remote === false && filters.onsite === false) {
        setFilteredData(data)
      } else {
        setFilteredData(result)
      }
      console.log(filters)
    }
  }, [filters])

  const filter = () => {
    setFilters({
      ...filters,
      jobTitle: document.getElementById('jobTitle').value,
      companyName: document.getElementById('companyName').value,
      senorityLevel: document.getElementById('experience').value,
      location: document.getElementById('location').value
    })
  }

  const filterRemote = (e) => {
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

  const getDate = () => {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()
    today = yyyy + '-' + mm + '-' + dd
    return today
  }

  const addJob = () => {
    if (document.getElementById('create_companyName').value === '' || document.getElementById('create_jobDescription').value === '' || document.getElementById('create_jobTitle').value === '') {
      alert('Please fill out all fields')
    } else {
      let remoteValue;
      if (document.getElementById('create_location').value === 'Remote (USA)') {
        remoteValue = true;
      } else {
        remoteValue = false;
      }
      axios.post(`${url}posts`, {
        active: true,
        companyName: document.getElementById('create_companyName').value,
        datePosted: getDate(),
        displayJobDescription: false,
        jobDescription: document.getElementById('create_jobDescription').value,
        jobTitle: document.getElementById('create_jobTitle').value,
        location: document.getElementById('create_location').value,
        remote: remoteValue,
        senorityLevel: document.getElementById('create_experience').value
      })
        document.getElementById('create_companyName').value = '';
        document.getElementById('create_jobDescription').value = '';
        document.getElementById('create_jobTitle').value = '';
        document.getElementById('create_location').value = 'Remote (USA)';
        document.getElementById('create_experience').value = '';
    }
  }

  const apply = () => {
    console.log('apply')
  }

  const clearFilters = () => {
    setFilters({ jobTitle: '', companyName: '', senorityLevel: '', location: '', remote: false, onsite: false });
    document.getElementById('jobTitle').value = '';
    document.getElementById('companyName').value = '';
    document.getElementById('experience').value = '';
    document.getElementById('all').checked = true;
  }

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  if (data !== null && filteredData !== null) {
    return (
      <div className="App">
        <h1>Job Board</h1>
        <Routes>
          <Route exact path='/' element={
            <>
              <p className='jobsinfo'>({filteredData.length}) Jobs</p>
              <div className='job-container'>
                <Filters filter={filter} filterRemote={filterRemote} clearFilters={clearFilters} data={data}/>
                {filteredData.length === 0 ? <p className='text'>-- No Jobs --</p> : <Jobs filteredData={filteredData} apply={apply}/>}
              </div>
            </>
          }>
          </Route>
          <Route exact path='/post-job' element={<CreateJobPost addJob={addJob}/>}/>
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
