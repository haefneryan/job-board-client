import React from 'react';

import './Pagination.css'

const Pagination = (props) => {
    const { postsPerPage, totalPosts, paginate, currentPage } = props;
    const pageNumbers =[];

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <div className='boundingbox'>
                <ul className='pagination-bar'>
                    {pageNumbers.map((number) => {
                        return (
                        <li key={number} className={`pagination-item ${(currentPage === number) ? 'active' : ''}`} onClick={() => paginate(number)}>
                            <p className='page-numbers'>{number}</p>
                        </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    )
}

export default Pagination;