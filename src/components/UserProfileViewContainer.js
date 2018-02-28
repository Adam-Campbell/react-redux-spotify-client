import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import UserProfileViewPresenter from './UserProfileViewPresenter';
import Loader from './Loader';

class UserProfileViewContainer extends Component {

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
            <UserProfileViewPresenter 
                userInfo={this.props.userInfo}
                playPauseTrack={this.props.playPauseUserRecentTrack}
                currentlySelectedCollection={this.props.currentlySelectedCollection}
            />
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
)(UserProfileViewContainer);