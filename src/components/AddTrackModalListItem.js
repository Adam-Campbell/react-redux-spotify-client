import React from 'react';
import PropTypes from 'prop-types';

const AddTrackModalListItem = props => (
    <li 
        className="modal__list-item"
        onClick={() => props.addTrackToPlaylist(
            props.userID, props.playlistID, props.trackToAdd, props.accessToken
        )}
    >
        <div 
            className="modal__image-holder"
            style={ { backgroundImage: `url("${props.playlistImage}")` } }
        ></div>
        <p className="modal__text">{props.playlistName}</p>
    </li>
);


AddTrackModalListItem.propTypes = {
    addTrackToPlaylist: PropTypes.func,
    playlistName: PropTypes.string,
    playlistID: PropTypes.string,
    playlistImage: PropTypes.string,
    userID: PropTypes.string,
    trackToAdd: PropTypes.object,
    accessToken: PropTypes.string
}

export default AddTrackModalListItem;