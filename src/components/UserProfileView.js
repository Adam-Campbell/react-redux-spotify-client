import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import UserHeader from './UserHeader';
import InlineTrackCollection from './InlineTrackCollection';
import ArtistCollection from './ArtistCollection';
import PlaylistCollection from './PlaylistCollection';
import Loader from './Loader';
import CreateNewPlaylistCard from './CreateNewPlaylistCard';
import FadeInContainer from './FadeInContainer';

class UserProfileView extends Component {

    componentDidMount() {
        if(!this.props.userInfo.hasFetched) {
            this.props.fetchUserProfile(this.props.accessToken);
        }
    }

    render() {
        if (this.props.userInfo.isFetching) {
            return <Loader />;
        }
        return (
            
                <div>
                    <UserHeader 
                        userName={this.props.userInfo.userName}
                        userImage={this.props.userInfo.userImage}
                    />
                    <InlineTrackCollection 
                        trackArray={this.props.userInfo.recentTracks}
                        title="Recently Played Tracks"
                        playPauseTrack={this.props.playPauseUserRecentTrack}
                        currentlySelectedCollection={this.props.currentlySelectedCollection}
                    />
                    <ArtistCollection 
                        artistArray={this.props.userInfo.topArtists}
                        title="Your Top Artists"
                    />
                    <PlaylistCollection 
                        playlistArray={this.props.userInfo.playlists}
                        title="Your Playlists"
                    >
                        <CreateNewPlaylistCard />
                    </PlaylistCollection>
                </div>
          
        );
    }
}


const mapStateToProps = state => ({
    userInfo: state.userInfo,
    accessToken: state.accessToken.token,
    currentlySelectedCollection: state.currentlySelectedCollection
});

export default connect(
    mapStateToProps, 
    {
        fetchUserProfile: ActionCreators.fetchUserProfile,
        playPauseUserRecentTrack: ActionCreators.playPauseUserRecentTrack
    }
)(UserProfileView);






