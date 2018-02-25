import React from 'react';
import PropTypes from 'prop-types';

const Loader = props => (
    <div className="loader">
        <span className="loader__line loader__line--1"></span>
        <span className="loader__line loader__line--2"></span>
        <span className="loader__line loader__line--3"></span>
    </div> 
);

export default Loader;
