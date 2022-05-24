import { getDate } from './GetDate';
import axios from 'axios';
import { url } from './url';

export const addJob = () => {
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