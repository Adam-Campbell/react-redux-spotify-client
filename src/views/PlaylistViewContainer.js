import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import Loader from '../components/Loader';
import PlaylistViewPresenter from './PlaylistViewPresenter';



class PlaylistViewContainer extends Component {

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
                <PlaylistViewPresenter 
                    playlist={playlist}
                    playPauseTrack={this.props.playPausePlaylistTrack}
                    currentlySelectedCollection={this.props.currentlySelectedCollection}
                    accessToken={this.props.accessToken}
                    userID={this.props.userID}
                />
            );
        } else if (this.props.playlists.isFetching) {
            return <Loader />;
        } 
        return null;
    }
}

const mapStateToProps = state => ({
    playlists: state.playlists,
    accessToken: state.accessToken.token,
    currentlySelectedCollection: state.currentlySelectedCollection,
    userID: state.userInfo.userID
});

export default connect(
    mapStateToProps, 
    {
        fetchPlaylist: ActionCreators.fetchPlaylist,
        playPausePlaylistTrack: ActionCreators.playPausePlaylistTrack
    }
)(PlaylistViewContainer);