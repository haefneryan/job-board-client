import React from 'react';
import LocationSelect from '../components/functions/LocationSelect';
import { addJob } from '../components/functions/AddJob';

import './CreateJobPost.css';

function CreateJobPost() {

    return (
        <div className='postJob'>
            <h2>Post New Job Opening</h2>
            <div className='category'>
                <p className='label'>Company Name:</p>
                <input type='text' className='create-text-input' id='create_companyName' name='companyName' placeholder='Enter Company Name...'/>
            </div>
            <div className='category'>
                <p className='label'>Job Title:</p>
                <input type='text' className='create-text-input' id='create_jobTitle' name='jobTitle' placeholder='Enter Job Title...'/>
            </div>
            <div className='category'>
                <p className='label'>Experience:</p>
                <select className='create-select-input' id='create_experience' name='experience'>
                    <option value='Any'>Any</option>
                    <option value='Entry-Level'>Entry-Level</option>
                    <option value='Mid-Level'>Mid-Level</option>
                    <option value='Senior-Level'>Senior-Level</option>
                </select>
            </div>
            <LocationSelect />
            <div className='category'>
                <p className='label'>Job Description:</p>
                <textarea type='text' className='create-text-input' id='create_jobDescription' name='jobDescription' placeholder='Enter Job Description...'/>
            </div>
            <button className='submitBtn' onClick={(e) => addJob(e)}>Submit</button>
        </div>
    )
}

export default CreateJobPost
