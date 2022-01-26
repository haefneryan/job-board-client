import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';


import './ApplyForm.css';

function ApplyForm(props) {
    const { closeApplyWindow, currentJob } = props;
    const form = useRef();

    const apply = () => {
        console.log()
        emailjs.sendForm('service_3s2eslo', 'template_gko4qy6', form.current, 'user_6uwdhO1UNBV63Cv0C0Lyj')
        .then(
            res => console.log('success', res.status),
            error => console.log(error)
        )
    };

    return (
        <div className='formBackground'>
            <div className='formBox'>
                <h2>Apply for Job</h2>
                <p>Applying for {currentJob.jobTitle} at {currentJob.companyName}</p>
                <form ref={form} onSubmit={apply}>
                    <div className='applyFormDiv'>
                        <label className='appWindowLabel'>Full Name:</label>
                        <input type='text' name='from_name' className='appWindowInput'/>
                    </div>
                    <div className='applyFormDiv'>
                        <label className='appWindowLabel'>Phone Number:</label>
                        <input type='text' name='phoneNumber' className='appWindowInput'/>
                    </div>
                    <div className='applyFormDiv'>
                        <label className='appWindowLabel'>Email:</label>
                        <input type='text' name='emailAddress' className='appWindowInput'/>
                    </div>
                    <input type='submit' value='SUMBIT' className='btn submitApp'/>
                </form>
                <button className='closeApplyWindow btn' onClick={closeApplyWindow}>CLOSE</button>
            </div>
        </div>
    )
}

export default ApplyForm;