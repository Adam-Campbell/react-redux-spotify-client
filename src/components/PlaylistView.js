import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import Playlist from './Playlist';

class PlaylistView extends Component {

    componentDidMount() {
        if (!this.props.playlists.hasOwnProperty(this.props.playlistID)) {
            this.props.fetchPlaylist(this.props.accessToken, this.props.playlistID, this.props.userID);  
        }
    }

    render() {
        const playlistID = this.props.playlistID;
        if (this.props.playlists.hasOwnProperty(playlistID)) {
            const playlist = this.props.playlists[playlistID];
            return (
                <Playlist 
                    playlistName={playlist.playlistName}
                    playlistID={playlist.playlistID}
                    playlistImage={playlist.playlistImage}
                    ownerID={playlist.ownerID}
                    ownerName={playlist.ownerName}
                    playlistTracks={playlist.playlistTracks}
                    playPauseTrack={this.props.playPausePlaylistTrack}
                    currentlySelectedCollection={this.props.currentlySelectedCollection}
                />
            );
        } else {
            return null;
        }
    }

}





const mapStateToProps = state => {
    return {
        playlists: state.playlists,
        isFetchingPlaylist: state.isFetchingPlaylist,
        accessToken: state.accessToken.token,
        currentlySelectedCollection: state.currentlySelectedCollection
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