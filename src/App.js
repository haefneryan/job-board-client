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
      //let result = [];
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
          if (senority_Level === filters.senorityLevel || senority_Level === 'any') {
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
      
      if (filters.jobTitle.length === 0 && filters.companyName.length === 0 && filters.senorityLevel.length === 0 && filters.remote === false && filters.onsite === false) {
        setFilteredData(data)
      } else {
        setFilteredData(result)
      }
      console.log(filters)
    }
  }, [filters])

  const filterJobTitle = (e) => {
    setFilters({
      ...filters,
      jobTitle: e.target.value
    })
  }

  const filterCompanyName = (e) => {
    setFilters({
      ...filters,
      companyName: e.target.value.toLowerCase()
    })
  }

  const filterSeniorityLevel = (e) => {
    setFilters({
      ...filters,
      senorityLevel: e.target.value.toLowerCase()
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
    if (document.getElementById('companyName').value === '' || document.getElementById('jobDescription').value === '' || document.getElementById('jobTitle').value === '') {
      alert('Please fill out all fields')
    } else {
      let remoteValue;
      if (document.getElementById('location').value === 'Remote (USA)') {
        remoteValue = true
      } else {
        remoteValue = false
      }
      axios.post(`${url}posts`, {
        active: true,
        companyName: document.getElementById('companyName').value,
        datePosted: getDate(),
        displayJobDescription: false,
        jobDescription: document.getElementById('jobDescription').value,
        jobTitle: document.getElementById('jobTitle').value,
        location: document.getElementById('location').value,
        remote: remoteValue,
        senorityLevel: document.getElementById('experience').value
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

  if (data !== null && filteredData !== null) {
    return (
      <div className="App">
        <h1>Job Board</h1>
        <p>({filteredData.length}) Jobs</p>
        <Routes>
          <Route exact path='/' element={
            <div className='job-container'>
              <Filters filterJobTitle={filterJobTitle} filterCompanyName={filterCompanyName} filterSeniorityLevel={filterSeniorityLevel} filterRemote={filterRemote} clearFilters={clearFilters}/>
              {filteredData.length === 0 ? <p className='text'>-- No Jobs --</p> : <Jobs filteredData={filteredData} apply={apply}/>}
              </div>
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
