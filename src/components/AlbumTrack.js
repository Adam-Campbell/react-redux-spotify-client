import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlayCircle from '@fortawesome/fontawesome-free-solid/faPlayCircle';
import faPauseCircle from '@fortawesome/fontawesome-free-solid/faPauseCircle';

const AlbumTrack = props => {

    let isPlaying = false;
    let isCurrentlySelected = false;
    const {collection, collectionKey} = props.currentlySelectedCollection;
    if (collectionKey === props.identifier) {
        const index = collection.findIndex(track => track.trackID === props.trackID);
        isPlaying = collection[index].isPlaying;
        isCurrentlySelected = collection[index].isCurrentlySelected;
    }

    return (
        <li 
            className={(isCurrentlySelected) ? "album-track is-selected" : "album-track" }
            onClick={() => {
                    if (props.previewURL) {    
                        props.playPauseTrack();
                    } else {
                        console.log("Sorry, for some reason Spotify haven't provided a preview for this track.");
                    }
                }
            }
        >
            <FontAwesomeIcon icon={(isPlaying) ? faPauseCircle : faPlayCircle} />
            <span className="album-track__number">{props.trackNumber}</span>
            <p className="album-track__name">{props.trackName}</p>
            <span className="album-track__length">{props.duration}</span>
        </li>
    );
}

AlbumTrack.propTypes = {
    trackName: PropTypes.string,
    trackID: PropTypes.string,
    duration: PropTypes.string,
    trackNumber: PropTypes.number,
    albumImage: PropTypes.string,
    previewURL: PropTypes.string,
    playPauseTrack: PropTypes.func
}

export default AlbumTrack;