import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import * as ActionCreators from '../actions';
import { connect } from 'react-redux';
import SubNavigation from './SubNavigation';

class Navigation extends Component {

    hideNav() {
        document.getElementById('root').classList.remove('nav-open');
    }

    render() {
        return (
            <div className="nav-container">
                <nav className="nav">
                    <ul className="nav__list">
                        <li className="nav__list-item">
                            <NavLink to="/search" className="nav__link" onClick={this.hideNav}>Search</NavLink>
                        </li>
                        <li className="nav__list-item">
                            <NavLink to="/browse" className="nav__link" onClick={this.hideNav}>Browse</NavLink>
                        </li>
                        <li className="nav__list-item">
                            <NavLink to="/me" className="nav__link" onClick={this.hideNav}>Me</NavLink>
                        </li>
                        <SubNavigation 
                            artistInfo={this.props.artistInfo}
                            hideNav={this.hideNav} 
                        />
                        
                    </ul>
                </nav>
            </div>
        );
    }
}



const mapStateToProps = state => ({
    artistInfo: state.artistInfo,
    accessToken: state.accessToken.token
});

export default connect(
    mapStateToProps, 
    null, 
    null, 
    {pure: false}
)(Navigation);
