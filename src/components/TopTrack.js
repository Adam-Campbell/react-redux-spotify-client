import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlayCircle from '@fortawesome/fontawesome-free-solid/faPlayCircle';
import faPauseCircle from '@fortawesome/fontawesome-free-solid/faPauseCircle';

const TopTrack = props => {
    return (
        <li 
            className={(props.isCurrentlySelected) ? "top-track is-selected" : "top-track" }
            onClick={props.playPauseTrack}    
        >
            <img className="top-track__image" src={props.image} alt=""></img>
            <FontAwesomeIcon icon={(props.isPlaying) ? faPauseCircle : faPlayCircle} />
            <p className="top-track__name">{props.name}</p>
            <span className="top-track__length">{props.duration}</span>
        </li>        
    );
}

// <i className="fas fa-pause-circle"></i>
// <i className="fas fa-play-circle"></i>

TopTrack.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    duration: PropTypes.string,
    isPlaying: PropTypes.bool,
    isCurrentlySelected: PropTypes.bool,
    playPauseTrack: PropTypes.func
};

export default TopTrack;


//<i className={(props.isPlaying) ? "fas fa-pause-circle" : "fas fa-play-circle"}></i>