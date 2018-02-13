import React from 'react';
import PropTypes from 'prop-types';
import Playlist from './Playlist';
import UserPlaylist from './UserPlaylist';

//
//  This component will render one of two Playlist components depending on whether the playlist
//  is owned by the currently logged in user. If it is, it will render UserPlaylist (not created
//  yet), and if not then it will simply render playlist. 
//  It needs these props - the playlist, the playPauseTrack function, the currentlySelectedCollection, 
//  the accessToken, and the ID of the currently logged in user. 
//
//


const PlaylistFormatPicker = props => {
    
    if (props.playlist.ownerID === props.userID) {
        console.log('the playlist rendered was owned by the current user!');
        return (
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
        );
    } else {
        console.log("the playlist rendered wasn't owned by the current user!");
        return (
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
        );
    }
    
};

PlaylistFormatPicker.propTypes = {
    playlist: PropTypes.object,
    playPauseTrack: PropTypes.func,
    currentlySelectedCollection: PropTypes.object,
    accessToken: PropTypes.string,
    userID: PropTypes.string
};

export default PlaylistFormatPicker;