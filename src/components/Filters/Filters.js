import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../../actions/filtersActions';
import { filterRemoteOnsiteAll, filterRemote, filterOnsite, clearFilters } from '../../actions/filtersActions';
import { clearFiltersLocal } from '../../functions/clearFiltersLocal';
import { setFilteredData } from '../../actions/filteredDataActions';

import './Filters.css';

function Filters() {
    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const locations = [];

    state.data.map((x) => {
        if (!locations.some(y => x.location === y)) {
            locations.push(x.location)
        }
    })

    return (
        <div className='filters'>
            <h3 className='filtersTitle'>Filters</h3>
            <div>
                <label>Job Title:</label>
                <input id='jobTitle' className='filterInput' placeholder='Search Job Title...' onChange={() => dispatch(setFilters(document.getElementById('jobTitle').value, document.getElementById('companyName').value, document.getElementById('experience').value, document.getElementById('location').value))}/>
            </div>
            <div>
                <label>Company Name:</label>
                <input id='companyName' className='filterInput' placeholder='Search Company Name...' onChange={() => dispatch(setFilters(document.getElementById('jobTitle').value, document.getElementById('companyName').value, document.getElementById('experience').value, document.getElementById('location').value))}/>
            </div>
            <div>
                <label>Experience:</label>
                <select id='experience' className='filterSelect' onChange={() => dispatch(setFilters(document.getElementById('jobTitle').value, document.getElementById('companyName').value, document.getElementById('experience').value, document.getElementById('location').value))}>
                    <option value=''>Any</option>
                    <option value='entry-level'>Entry-Level</option>
                    <option value='mid-level'>Mid-Level</option>
                    <option value='senior-level'>Senior-Level</option>
                </select>
            </div>
            <div>
                <label>Location:</label>
                <select id='location' className='filterSelect' onChange={() => dispatch(setFilters(document.getElementById('jobTitle').value, document.getElementById('companyName').value, document.getElementById('experience').value, document.getElementById('location').value))}>
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
                    <input type='radio' className='filterRadio' name='remote' id='all' defaultChecked onChange={() => dispatch(filterRemoteOnsiteAll())}/>
                </div>
                <div className='form-item'>
                    <label className='radiolabel'>Remote Only:</label>
                    <input type='radio' className='filterRadio' name='remote' id='remoteOnly' defaultValue={false} onChange={() => dispatch(filterRemote())}/>
                </div>
                <div className='form-item'>
                    <label className='radiolabel'>On-Site Only:</label>
                    <input type='radio' className='filterRadio' name='remote' id='onSiteOnly' defaultValue={false} onChange={() => dispatch(filterOnsite())}/>
                </div>
            </form>
            <br></br>
            <button className='submitBtn' onClick={() => {clearFiltersLocal(); dispatch(clearFilters(state))}}>Clear Filters</button>
        </div>
    )
}

export default Filters;