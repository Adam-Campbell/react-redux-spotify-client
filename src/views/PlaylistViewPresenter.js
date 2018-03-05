import React from 'react';
import PropTypes from 'prop-types';
import Playlist from '../components/Playlist';
import UserPlaylist from '../components/UserPlaylist';
import { imageSizePicker } from '../helpers';

const PlaylistViewPresenter = props => (
    props.playlist.ownerID === props.userID ? (
        <UserPlaylist 
            playlistName={props.playlist.playlistName}
            playlistID={props.playlist.playlistID}
            playlistImage={imageSizePicker(props.playlist.playlistImage, 320, 320)}
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
            playlistImage={imageSizePicker(props.playlist.playlistImage, 320, 320)}
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

PlaylistViewPresenter.propTypes = {
    playlist: PropTypes.object,
    playPauseTrack: PropTypes.func,
    currentlySelectedCollection: PropTypes.object,
    accessToken: PropTypes.string,
    userID: PropTypes.string
};

export default PlaylistViewPresenter;