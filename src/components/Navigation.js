import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import * as ActionCreators from '../actions';
import { connect } from 'react-redux';


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
                        {
                            (() => {
                                if (this.props.artistInfo.artistName) {
                                    return (
                                        <li className="nav__list-item">
                                            <p className="nav__sub-nav-label">{this.props.artistInfo.artistName}</p>
                                            <ul className="nav__sub-nav">
                                                <li className="nav__sub-nav-list-item">
                                                    <NavLink to="/artist/overview" className="nav__sub-nav-link" onClick={this.hideNav}>Overview</NavLink>
                                                </li>
                                                <li className="nav__sub-nav-list-item">
                                                    <NavLink to="/artist/albums" className="nav__sub-nav-link" onClick={this.hideNav}>Albums</NavLink>
                                                </li>
                                                <li className="nav__sub-nav-list-item">
                                                    <NavLink to="/artist/related-artists" className="nav__sub-nav-link" onClick={this.hideNav}>Related Artists</NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                    );
                                }
                            })()
                        }
                        
                    </ul>
                </nav>
            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        artistInfo: state.artistInfo,
        accessToken: state.accessToken
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserProfile(token) {
            dispatch(
                ActionCreators.fetchUserProfile(token)
            );
        },
        fetchHighlights(token) {
            dispatch(
                ActionCreators.fetchHighlights(token)
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(Navigation);
