import React, { Component } from 'react';
import PropTypes from 'prop-types';


const TopBar = () => {

    function toggleNav() {
        document.querySelector('.main-container').classList.toggle('nav-open');
    }

    return (
        <div className="top-bar">
            <div id="nav-toggle" className="nav-toggle" onClick={toggleNav}>
                <span className="nav-toggle__line nav-toggle__line--1"></span>
                <span className="nav-toggle__line nav-toggle__line--2"></span>
                <span className="nav-toggle__line nav-toggle__line--3"></span>
            </div>
        </div>
    );
}

/*
class TopBar extends Component {

    toggleNav() {
        document.querySelector('.main-container').classList.toggle('nav-open');
    }

    render() {
        return (
            <div className="top-bar">
                <div id="nav-toggle" className="nav-toggle" onClick={this.toggleNav}>
                    <span className="nav-toggle__line nav-toggle__line--1"></span>
                    <span className="nav-toggle__line nav-toggle__line--2"></span>
                    <span className="nav-toggle__line nav-toggle__line--3"></span>
                </div>
            </div>
        );        
    }
}
*/


export default TopBar;