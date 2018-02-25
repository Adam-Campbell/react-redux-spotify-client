import React from 'react';
import PropTypes from 'prop-types';
import Playlist from './Playlist';
import UserPlaylist from './UserPlaylist';

const PlaylistFormatPicker = props => (
    props.playlist.ownerID === props.userID ? (
        <UserPlaylist 
            playlistName={props.playlist.playlistName}
            playlistID={props.playlist.playlistID}
            playlistImage={props.playlist.playlistImage}
            ownerID={props.playlist.ownerID}
            ownerName={props.playlist.ownerName}
            playlistTracks={props.playlist.playlistTracks}
            playPauseTrack={props.playPauseTrack}
            currentlySelectedCollection={props.currentlySelectedCollection}
            accessToken={props.accessToken}
            userID={props.userID}
        />
    ) : (
        <Playlist 
            playlistName={props.playlist.playlistName}
            playlistID={props.playlist.playlistID}
            playlistImage={props.playlist.playlistImage}
            ownerID={props.playlist.ownerID}
            ownerName={props.playlist.ownerName}
            playlistTracks={props.playlist.playlistTracks}
            playPauseTrack={props.playPauseTrack}
            currentlySelectedCollection={props.currentlySelectedCollection}
            accessToken={props.accessToken}
            userID={props.userID}
        />
    ) 
);

PlaylistFormatPicker.propTypes = {
    playlist: PropTypes.object,
    playPauseTrack: PropTypes.func,
    currentlySelectedCollection: PropTypes.object,
    accessToken: PropTypes.string,
    userID: PropTypes.string
};

export default PlaylistFormatPicker;