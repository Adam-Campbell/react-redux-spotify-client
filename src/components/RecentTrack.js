import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlayCircle from '@fortawesome/fontawesome-free-solid/faPlayCircle';
import faPauseCircle from '@fortawesome/fontawesome-free-solid/faPauseCircle';

const RecentTrack = props => {
    return (
        <li className="recent-track">
            <img className="recent-track__image" src={props.image}></img>
            <FontAwesomeIcon icon={(props.isPlaying) ? faPauseCircle : faPlayCircle} />
            <p className="recent-track__name">{props.name}</p>
            <span className="recent-track__length">{props.duration}</span>
        </li>
    );
}

RecentTrack.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    duration: PropTypes.string,
    artistName: PropTypes.string,
    previewURL: PropTypes.string,
    isCurrentlySelected: PropTypes.bool,
    isPlaying: PropTypes.bool
}

export default RecentTrack;