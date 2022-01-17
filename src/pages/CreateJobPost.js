import React from 'react';

import classes from './CreateJobPost.css'

function CreateJobPost(props) {
    const { addJob } = props;

    return (
        <div className='postJob'>
            <h2>Post New Job Opening</h2>
                <div>
                    <p className='label'>Company Name:</p>
                    <input type='text' id='create_companyName' name='companyName' placeholder='Enter Company Name...'/>
                </div>
                <div>
                    <p className='label'>Job Title:</p>
                    <input type='text' id='create_jobTitle' name='jobTitle' placeholder='Enter Job Title...'/>
                </div>
                <div>
                    <p className='label'>Experience:</p>
                    <select id='create_experience' name='experience'>
                        <option value='Any'>Any</option>
                        <option value='Entry-Level'>Entry-Level</option>
                        <option value='Mid-Level'>Mid-Level</option>
                        <option value='Senior-Level'>Senior-Level</option>
                    </select>
                </div>
                <p className='label'>Location:</p>
                <select id='create_location' name='location'>
                    <option value='Remote (USA)'>Remote (USA)</option>
                    <option value='Chicago, IL'>Chicago, IL</option>
                    <option value='Los Angeles, CA'>Los Angeles, CA</option>
                    <option value='New York City, NY'>New York City, NY</option>
                    <option value='Detroit, MI'>Detroit, MI</option>
                </select>
                <div>
                    <p className='label'>Job Description:</p>
                    <input type='text' id='create_jobDescription' name='jobDescription' placeholder='Enter Job Description...'/>
                </div>
            <button onClick={(e) => addJob(e)}>Submit</button>
        </div>
    )
}

export default CreateJobPost
