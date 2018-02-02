import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const InlineNav = props => {
    return (
        <nav className="inline-nav">
            <ul className="inline-nav__list">
                <li className="inline-nav__list-item">
                    <NavLink to={`/artist/${props.currentArtist}/overview`} className="inline-nav__link inline-nav__link-active">Overview</NavLink>
                </li>
                <li className="inline-nav__list-item">
                    <NavLink to={`/artist/${props.currentArtist}/albums`} className="inline-nav__link">Albums</NavLink>
                </li>
                <li className="inline-nav__list-item">
                    <NavLink to={`/artist/${props.currentArtist}/related-artists`} className="inline-nav__link">Related Artists</NavLink>
                </li>
            </ul>
        </nav>
    );
}

InlineNav.propTypes = {
    currentArtist: PropTypes.string
}

export default InlineNav;