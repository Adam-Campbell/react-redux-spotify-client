import React from 'react';
import PropTypes from 'prop-types';

const Paginator = props => {
    
    const numberOfPages = Math.ceil(props.totalItems / props.itemsPerPage);
    const pageArray = Array.from({length: numberOfPages}, (val, index) => index + 1);

    return (
        <div className="paginator">
            {pageArray.map(page => (
                <a
                    href="#"
                    className={page === props.currentPage ? "paginator__link current" : "paginator__link"}
                    onClick={(e) => props.setPage(e, page)}
                    key={page}
                >
                    {page}
                </a>
            ))}
        </div>
    )
};

Paginator.propTypes = {
    totalItems: PropTypes.number,
    itemsPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    setPage: PropTypes.func
};

export default Paginator;