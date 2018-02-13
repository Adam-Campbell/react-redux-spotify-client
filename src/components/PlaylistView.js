import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import PlaylistFormatPicker from './PlaylistFormatPicker';
import Loader from './Loader';

class PlaylistView extends Component {

    componentDidMount() {
        if (!this.props.playlists.playlistData.hasOwnProperty(this.props.playlistID)) {
            this.props.fetchPlaylist(this.props.accessToken, this.props.playlistID, this.props.ownerID);  
        }
    }

    render() {
        const playlistID = this.props.playlistID;
        if (this.props.playlists.playlistData.hasOwnProperty(playlistID)) {
            const playlist = this.props.playlists.playlistData[playlistID];
            return (
                <PlaylistFormatPicker 
                    playlist={playlist}
                    playPauseTrack={this.props.playPausePlaylistTrack}
                    currentlySelectedCollection={this.props.currentlySelectedCollection}
                    accessToken={this.props.accessToken}
                    userID={this.props.userID}
                />
            );
        } else if (this.props.playlists.isFetching) {
            return <Loader />
        } else {
            return null;
        }
    }

}





const mapStateToProps = state => {
    return {
        playlists: state.playlists,
        accessToken: state.accessToken,
        currentlySelectedCollection: state.currentlySelectedCollection,
        userID: state.userInfo.userID
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPlaylist(token, playlistID, userID) {
            dispatch(
                ActionCreators.fetchPlaylist(token, playlistID, userID)
            );
        },
        playPausePlaylistTrack(trackID, identifier) {
            dispatch(
                ActionCreators.playPausePlaylistTrack(trackID, identifier)
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistView);

















// class PlaylistView extends Component {

//     componentDidMount() {
//         if (!this.props.playlists.playlistData.hasOwnProperty(this.props.playlistID)) {
//             this.props.fetchPlaylist(this.props.accessToken, this.props.playlistID, this.props.userID);  
//         }
//     }

//     render() {
//         const playlistID = this.props.playlistID;
//         if (this.props.playlists.playlistData.hasOwnProperty(playlistID)) {
//             const playlist = this.props.playlists.playlistData[playlistID];
//             return (
//                 <Playlist 
//                     playlistName={playlist.playlistName}
//                     playlistID={playlist.playlistID}
//                     playlistImage={playlist.playlistImage}
//                     ownerID={playlist.ownerID}
//                     ownerName={playlist.ownerName}
//                     playlistTracks={playlist.playlistTracks}
//                     playPauseTrack={this.props.playPausePlaylistTrack}
//                     currentlySelectedCollection={this.props.currentlySelectedCollection}
//                 />
//             );
//         } else if (this.props.playlists.isFetching) {
//             return <Loader />
//         } else {
//             return null;
//         }
//     }

// }