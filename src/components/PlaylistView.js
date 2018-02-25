import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import PlaylistFormatPicker from './PlaylistFormatPicker';
import Loader from './Loader';
import FadeInContainer from './FadeInContainer';

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
                <FadeInContainer>
                    <PlaylistFormatPicker 
                        playlist={playlist}
                        playPauseTrack={this.props.playPausePlaylistTrack}
                        currentlySelectedCollection={this.props.currentlySelectedCollection}
                        accessToken={this.props.accessToken}
                        userID={this.props.userID}
                    />
                </FadeInContainer>
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
)(PlaylistView);
