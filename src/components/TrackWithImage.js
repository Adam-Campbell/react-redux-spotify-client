import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlayCircle from '@fortawesome/fontawesome-free-solid/faPlayCircle';
import faPauseCircle from '@fortawesome/fontawesome-free-solid/faPauseCircle';
import AddTrackButton from './AddTrackButton';


const TrackWithImage = props => {
    let isPlaying = false;
    let isCurrentlySelected = false;
    const {collection, collectionKey} = props.currentlySelectedCollection;
    if (collectionKey === props.track.identifier) {
        const index = collection.findIndex(track => track.trackID === props.track.trackID);
        isPlaying = collection[index].isPlaying;
        isCurrentlySelected = collection[index].isCurrentlySelected;
    }

    return (
        <li 
            className={(isCurrentlySelected) ? "track is-selected" : "track" }
            onClick={() => {
                        if (props.track.previewURL) {    
                            props.playPauseTrack();
                        } else {
                            console.log("Sorry, for some reason Spotify haven't provided a preview for this track.");
                        }
                    }
                }   
        >
            <img className="track__image" src={props.track.albumImage} alt=""></img>
            <FontAwesomeIcon icon={(isPlaying) ? faPauseCircle : faPlayCircle} />
            <p className="track__name">{props.track.trackName}</p>
            <AddTrackButton 
                track={props.track}
            />
            {props.children}
            <span className="track__duration">{props.track.duration}</span>
        </li>  
    );
}

export default TrackWithImage;
