import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import * as ActionCreators from '../actions';
import { connect } from 'react-redux';
import SubNavigation from './SubNavigation';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faList from '@fortawesome/fontawesome-free-solid/faList';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';


const Navigation = props => (
    <div className="nav-container">
        <nav className="nav">
            <ul className="nav__list">
                <li className="nav__list-item">
                    <NavLink to="/search" className="nav__link" onClick={props.toggleNav}>
                        <FontAwesomeIcon icon={faSearch} />
                        Search
                    </NavLink>
                </li>
                <li className="nav__list-item">
                    <NavLink to="/browse" className="nav__link" onClick={props.toggleNav}>
                        <FontAwesomeIcon icon={faList} />
                        Browse
                    </NavLink>
                </li>
                <li className="nav__list-item">
                    <NavLink to="/me" className="nav__link" onClick={props.toggleNav}>
                        <FontAwesomeIcon icon={faUser} />
                        Me
                    </NavLink>
                </li>
                <SubNavigation 
                    artistInfo={props.artistInfo}
                    toggleNav={props.toggleNav} 
                />
                
            </ul>
        </nav>
    </div>
);


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
