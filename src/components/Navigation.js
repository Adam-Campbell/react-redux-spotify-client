import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as ActionCreators from '../actions';
import { connect } from 'react-redux';
import { fetchHighlights } from '../actions';


/*
function hideNav() {
    document.querySelector('.main-container').classList.remove('nav-open');
}

async function getMyTracks(token) {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    const myInit = {
        headers: myHeaders
    };
    const tracks = await fetch('https://api.spotify.com/v1/me/player/recently-played', myInit);
    const tracksJSON = await tracks.json();
    console.log(tracksJSON);
}

const Navigation = props => {
    return (
        <div className="nav-container">
            <nav className="nav">
                <ul className="nav__list">
                    <li className="nav__item">
                        <Link to="/search" className="nav__link" onClick={hideNav}>Search</Link>
                    </li>
                    <li className="nav__item">
                        <Link to="/artist" className="nav__link" onClick={hideNav}>Overview</Link>
                    </li>
                    <li className="nav__item">
                        <Link to="/albums" className="nav__link" onClick={hideNav}>Albums</Link>
                    </li>
                    <li className="nav__item">
                        <Link to="/related-artists" className="nav__link" onClick={hideNav}>Related Artists</Link>
                    </li>    
                    <p onClick={() => getMyTracks(props.accessToken)}>Get my top tracks</p>
                </ul> 
            </nav>
        </div>
    );
}
*/

class Navigation extends Component {

    hideNav() {
        document.querySelector('.main-container').classList.remove('nav-open');
    }

    render() {
        return (
            <div className="nav-container">
                <nav className="nav">
                    <ul className="nav__list">
                        <li className="nav__item">
                            <Link to="/search" className="nav__link" onClick={this.hideNav}>Search</Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/artist/overview" className="nav__link" onClick={this.hideNav}>Overview</Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/artist/albums" className="nav__link" onClick={this.hideNav}>Albums</Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/artist/related-artists" className="nav__link" onClick={this.hideNav}>Related Artists</Link>
                        </li> 
                        <li className="nav__item">
                            <Link to="/me" className="nav__link" onClick={this.hideNav}>Me</Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/browse" className="nav__link" onClick={this.hideNav}>Browse</Link>
                        </li>      
                        <p onClick={() => this.props.fetchHighlights(this.props.accessToken)}>Browse new stuff</p>
                    </ul> 
                </nav>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
