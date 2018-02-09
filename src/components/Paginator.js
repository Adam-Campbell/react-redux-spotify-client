import React from 'react';
import PropTypes from 'prop-types';

const Paginator = props => {
    

    const numberOfPages = Math.ceil(props.totalItems / props.itemsPerPage);
    const pageArray = [];
    for (let i = 1; i <= numberOfPages; i++) {
        pageArray.push(i);
    }

    return (
        <div className="paginator">
            {
                pageArray.map(page => {
                    return (
                        <a
                            href="#"
                            className={page === props.currentPage ? "paginator__link current" : "paginator__link"}
                            onClick={(e) => props.setPage(e, page)}
                            key={page}
                        >
                            {page}
                        </a>
                    );
                })
            }
        </div>
    )
}

Paginator.propTypes = {
    totalItems: PropTypes.number,
    itemsPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    setPage: PropTypes.func
}

export default Paginator;