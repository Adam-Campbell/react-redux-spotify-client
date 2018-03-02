import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from './actions';
import { authURL } from './globalConstants';
import AppPresenter from './AppPresenter';


class AppContainer extends Component {

    constructor(props) {
        super(props);
        this.checkForAccessToken = this.checkForAccessToken.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isShowingNav: false
        }
    }

    toggleNav() {
        this.setState({isShowingNav: !this.state.isShowingNav});
    }

    // Convert accessToken to JSON and save to local storage.
    saveTokenToLocalStorage(accessToken) {
        try {
            const JSONAccessToken = JSON.stringify(accessToken);
            localStorage.setItem('accessToken', JSONAccessToken);
        } catch(err) {
            console.log(err);
        }
    }

    // Check if the accessToken is present in the URL (will only be true upon the immediate return from
    // Spotifys authentication page) then save it to store and to local storage. Otherwise check for it
    // in the store. Return true for either of these conditions else return false.
    checkForAccessToken() {
        if (window.location.hash) {
            const accessToken = window.location.hash.replace(/.*access_token=([^&]+).*/, '$1');
            const timestamp = Date.now();  
            this.props.storeToken(accessToken, timestamp);
            this.saveTokenToLocalStorage({
                token: accessToken,
                timestamp: timestamp
            });
            return true;
        } else if (this.props.accessToken) {
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        // If this check returns true then we have the accessToken and can begin the app. If it
        // returns false then we need to go to Spotify to get a token instead.
        if (this.checkForAccessToken()) {
            return <AppPresenter toggleNav={this.toggleNav} isShowingNav={this.state.isShowingNav} />
        } else {
            window.location = authURL;
            return null;
        }
    }
}

const mapStateToProps = state => ({
    accessToken: state.accessToken.token   
});


export default connect(
    mapStateToProps, 
    {storeToken: ActionCreators.storeToken}
)(AppContainer);
