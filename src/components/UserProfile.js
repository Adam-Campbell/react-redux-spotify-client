import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import UserHeader from './UserHeader';
import TrackCollection from './TrackCollection';
import ArtistCollection from './ArtistCollection';
import PlaylistCollection from './PlaylistCollection';


class UserProfile extends Component {

    componentDidMount() {
        if(!this.props.userInfo.userID) {
            this.props.fetchUserProfile(this.props.accessToken);
        }
    }

    render() {
        if (this.props.isFetchingUser) {
            return (
                <p>Your profile information is being fetched</p>
            );
        } else {
            return (
                <div className="container">
                    <UserHeader 
                        userName={this.props.userInfo.userName}
                        userImage={this.props.userInfo.userImage}
                    />
                    <TrackCollection 
                        trackArray={this.props.userInfo.recentTracks || []}
                        title="Recently Played Tracks"
                        playPauseTrack={this.props.playPauseUserRecentTrack}
                        currentlySelectedCollection={this.props.currentlySelectedCollection}
                    />
                    <ArtistCollection 
                        artistArray={this.props.userInfo.topArtists || []}
                        title="Your Top Artists"
                        fetchArtist={this.props.fetchArtist}
                        accessToken={this.props.accessToken}
                    />
                    <PlaylistCollection 
                        playlistArray={this.props.userInfo.playlists || []}
                        title="Your Playlists"
                        accessToken={this.props.accessToken}
                    />
                </div>
                
            )
        }
    }
}


const mapStateToProps = state => {
    return {
        userInfo: state.userInfo,
        isFetchingUser: state.isFetchingUser,
        accessToken: state.accessToken,
        currentlySelectedCollection: state.currentlySelectedCollection
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUserProfile(token) {
            dispatch(
                ActionCreators.fetchUserProfile(token)
            );
        },
        fetchArtist(id, token) {
            dispatch(
                ActionCreators.fetchArtist(id, token)
            );
        },
        playPauseUserRecentTrack(trackID, identifier) {
            dispatch(
                ActionCreators.playPauseUserRecentTrack(trackID, identifier)
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);