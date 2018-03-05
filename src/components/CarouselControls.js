import React from 'react';
import PropTypes from 'prop-types';

const CarouselControls = props => {
    const pageArray = Array.from({length: props.totalPages}, (val, index) => index + 1);
    if (props.totalPages > 1) {
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

CarouselControls.propTypes = {
    totalPages: PropTypes.number,
    currentPage: PropTypes.number,
    setPage: PropTypes.func
};

export default CarouselControls;