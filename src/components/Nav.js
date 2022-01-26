import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Nav.css';

function Nav() {

    return (
        <header>
            <h1>RH JOB BOARD</h1>
            <nav>
                <ul>
                    <li><Link to='/'><p>HOMEPAGE</p></Link></li>
                    <li><Link to='/post-job'><p>ADMIN - POST NEW JOB</p></Link></li>
                    <li><Link to='/update-job'><p>ADMIN - UPDATE JOB POST</p></Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Nav;