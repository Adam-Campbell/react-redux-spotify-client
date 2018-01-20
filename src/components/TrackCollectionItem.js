import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlayCircle from '@fortawesome/fontawesome-free-solid/faPlayCircle';
import faPauseCircle from '@fortawesome/fontawesome-free-solid/faPauseCircle';

//
//  we need to know if identifier is the same as collectionKey
//      If so then find the index position of the track that matches this tracks trackID.   
//      Then locally save the two booleans off of that track. These are the booleans you use
//      to render the DOM appropriately.
//


const TrackCollectionItem = props => {

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
            className={(isCurrentlySelected) ? "track-collection-item is-selected" : "track-collection-item" }
            onClick={() => {
                        if (props.previewURL) {    
                            props.playPauseTrack();
                        } else {
                            console.log("Sorry, for some reason Spotify haven't provided a preview for this track.");
                        }
                    }
                }   
        >
            <img className="track-collection-item__image" src={props.albumImage} alt=""></img>
            <FontAwesomeIcon icon={(isPlaying) ? faPauseCircle : faPlayCircle} />
            <p className="track-collection-item__name">{props.trackName}</p>
            <span className="track-collection-item__length">{props.duration}</span>
        </li>  
    )
}

TrackCollectionItem.propTypes = {
    trackName: PropTypes.string,
    trackID: PropTypes.string,
    albumImage: PropTypes.string,
    duration: PropTypes.string,
    previewURL: PropTypes.string,
    identifier: PropTypes.string,
    isPlaying: PropTypes.bool,
    isCurrentlySelected: PropTypes.bool,
    playPauseTrack: PropTypes.func
}

export default TrackCollectionItem;