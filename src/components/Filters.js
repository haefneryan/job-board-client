import React from 'react';

import classes from './Filters.css';

function Filters(props) {
    const { filterJobTitle, filterCompanyName, filterSeniorityLevel, filterRemote, clearFilters } = props;

    return (
        <div className='filters'>
            <p>Filters</p>
            <hr></hr>
            <div>
                <label>Job Title:</label>
                <input id='jobTitle' className='filterInput' placeholder='Search Job Title...' onChange={(e) => filterJobTitle(e)}/>
            </div>
            <div>
                <label>Company Name:</label>
                <input id='companyName' className='filterInput' placeholder='Search Company Name...' onChange={(e) => filterCompanyName(e)}/>
            </div>
            <div>
                <label>Experience:</label>
                <select id='experience' className='filterSelect' onChange={(e) => filterSeniorityLevel(e)}>
                    <option value=''>Any</option>
                    <option value='entry-level'>Entry-Level</option>
                    <option value='mid-level'>Mid-Level</option>
                    <option value='senior-level'>Senior-Level</option>
                </select>
            </div>
            <div>
                <label>Location:</label>
                <select className='filterSelect'>
                    <option>Location</option>
                </select>
            </div>
            <br></br>
            <form>
                <div className='form-item'>
                    <label>All: 
                        <input type='radio' className='filterRadio' name='remote' id='all' defaultChecked onChange={(e) => filterRemote(e)}/>
                    </label>
                </div>
                <div className='form-item'>
                    <label>Remote Only:
                        <input type='radio' className='filterRadio' name='remote' id='remoteOnly' defaultValue={false} onChange={(e) => filterRemote(e)}/>
                    </label>
                </div>
                <div className='form-item'>
                    <label>On-Site Only:
                        <input type='radio' className='filterRadio' name='remote' id='onSiteOnly' defaultValue={false} onChange={(e) => filterRemote(e)}/>
                    </label>
                </div>
            </form>
            <br></br>
            <button onClick={() => clearFilters()}>Clear Filters</button>
        </div>
    )
}

export default Filters;