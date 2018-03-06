import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faMusic from '@fortawesome/fontawesome-free-solid/faMusic';
import faInfo from '@fortawesome/fontawesome-free-solid/faInfo';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';

const SubNavigation = props => {
    if (
        props.artistInfo.currentArtist && 
        props.artistInfo.artistData.hasOwnProperty(props.artistInfo.currentArtist)
    ) {
        const artist = props.artistInfo.artistData[props.artistInfo.currentArtist];
        return (
            <li className="nav__list-item">
                <p className="nav__sub-nav-label">{artist.artistName}</p>
                <ul className="nav__sub-nav">
                    <li className="nav__sub-nav-list-item">
                        <NavLink to={`/artist/${artist.artistID}/overview`} className="nav__sub-nav-link" onClick={props.toggleNav}>
                            <FontAwesomeIcon icon={faInfo} />
                            Overview
                        </NavLink>
                    </li>
                    <li className="nav__sub-nav-list-item">
                        <NavLink to={`/artist/${artist.artistID}/music`} className="nav__sub-nav-link" onClick={props.toggleNav}>
                            <FontAwesomeIcon icon={faMusic} />
                            Music
                        </NavLink>
                    </li>
                    <li className="nav__sub-nav-list-item">
                        <NavLink to={`/artist/${artist.artistID}/related-artists`} className="nav__sub-nav-link" onClick={props.toggleNav}>
                            <FontAwesomeIcon icon={faUsers} />
                            Related Artists
                        </NavLink>
                    </li>
                </ul>
            </li>
        );
    } else {
        return null;
    }
}

SubNavigation.propTypes = {
    artistInfo: PropTypes.object,
    toggleNav: PropTypes.func
};

export default SubNavigation;