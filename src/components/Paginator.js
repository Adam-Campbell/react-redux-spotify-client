import React from 'react';
import PropTypes from 'prop-types';

const Paginator = props => {
    
    const numberOfPages = Math.ceil(props.totalItems / props.itemsPerPage);
    const pageArray = Array.from({length: numberOfPages}, (val, index) => index + 1);
    if (numberOfPages > 1) {
        return (
            <div className="paginator">
                {pageArray.map(page => (
                    <button
                        className={
                            page === props.currentPage ? 
                            "button button--slim button--light" : 
                            "button button--slim"
                        }
                        onClick={(e) => props.setPage(e, page)}
                        key={page}
                    >
                        {page}
                    </button>
                ))}
            </div>
        );
    } else {
        return null;
    }
};

Paginator.propTypes = {
    totalItems: PropTypes.number,
    itemsPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    setPage: PropTypes.func
};

export default Paginator;