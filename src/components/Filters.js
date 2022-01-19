import React from 'react';

import './Filters.css';

function Filters(props) {
    const { filter, filterRemote, clearFilters, data } = props;
    const locations = [];

    data.map((x) => {
        if (!locations.some(y => x.location === y)) {
            locations.push(x.location)
        }
    })

    return (
        <div className='filters'>
            <h3 className='filtersTitle'>Filters</h3>
            <div>
                <label>Job Title:</label>
                <input id='jobTitle' className='filterInput' placeholder='Search Job Title...' onChange={() => filter()}/>
            </div>
            <div>
                <label>Company Name:</label>
                <input id='companyName' className='filterInput' placeholder='Search Company Name...' onChange={() => filter()}/>
            </div>
            <div>
                <label>Experience:</label>
                <select id='experience' className='filterSelect' onChange={() => filter()}>
                    <option value=''>Any</option>
                    <option value='entry-level'>Entry-Level</option>
                    <option value='mid-level'>Mid-Level</option>
                    <option value='senior-level'>Senior-Level</option>
                </select>
            </div>
            <div>
                <label>Location:</label>
                <select id='location' className='filterSelect' onChange={() => filter()}>
                    <option value=''>Any</option>
                    {locations.map(x => {
                        return <option key={x} value={x.toLowerCase()}>{x}</option>;
                    })}
                </select>
            </div>
            <br></br>
            <form>
                <div className='form-item'>
                    <p className='radiolabel'>All: </p>
                    <input type='radio' className='filterRadio' name='remote' id='all' defaultChecked onChange={() => filterRemote()}/>
                </div>
                <div className='form-item'>
                    <label className='radiolabel'>Remote Only:</label>
                    <input type='radio' className='filterRadio' name='remote' id='remoteOnly' defaultValue={false} onChange={() => filterRemote()}/>
                </div>
                <div className='form-item'>
                    <label className='radiolabel'>On-Site Only:</label>
                    <input type='radio' className='filterRadio' name='remote' id='onSiteOnly' defaultValue={false} onChange={() => filterRemote()}/>
                </div>
            </form>
            <br></br>
            <button onClick={() => clearFilters()}>Clear Filters</button>
        </div>
    )
}

export default Filters;