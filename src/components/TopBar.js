import React, { Component } from 'react';
import PropTypes from 'prop-types';


const TopBar = props => (
    <div className="top-bar">
        <div id="navToggle" className="nav-toggle" onClick={props.toggleNav}>
            <span className="nav-toggle__line nav-toggle__line-1"></span>
            <span className="nav-toggle__line nav-toggle__line-2"></span>
            <span className="nav-toggle__line nav-toggle__line-3"></span>
        </div>
    </div>
);


export default TopBar;