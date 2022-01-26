import React from 'react';

function LocationSelect() {
  return (
    <div className='category'>
        <p className='label'>Location:</p>
        <select className='create-select-input' id='create_location' name='location'>
            <option value='Remote (USA)'>Remote (USA)</option>
            <option value='Chicago, IL'>Chicago, IL</option>
            <option value='Los Angeles, CA'>Los Angeles, CA</option>
            <option value='New York City, NY'>New York City, NY</option>
            <option value='Detroit, MI'>Detroit, MI</option>
        </select>
    </div>
  )
}

export default LocationSelect;
