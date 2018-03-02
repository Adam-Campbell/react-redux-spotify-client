import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from './actions';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Navigation from './components/Navigation';
import TopBar from './components/TopBar';
import Player from './components/Player';
import UserProfileViewContainer from './components/UserProfileViewContainer';
import BrowseViewContainer from './components/BrowseViewContainer';
import Portal from './components/Portal';
import AddTrackModal from './components/AddTrackModal';
import CreateNewPlaylistModal from './components/CreateNewPlaylistModal';
import ImageUploadModal from './components/ImageUploadModal';
import ErrorModal from './components/ErrorModal';
import { authURL } from './globalConstants';
import ArtistViewContainer from './components/ArtistViewContainer';
import AlbumViewContainer from './components/AlbumViewContainer';
import PlaylistViewContainer from './components/PlaylistViewContainer';
import CategoryViewContainer from './components/CategoryViewContainer';
import SearchViewContainer from './components/SearchViewContainer';

class App extends Component {

    constructor() {
        super();
        this.checkForAccessToken = this.checkForAccessToken.bind(this);
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
            return(
                <div>
                <BrowserRouter>
                    <div>
                        <Navigation />
                        <TopBar />
                        <div className="main-container">
                            
                            <Switch>
                                <Route exact path="/" render={() => <Redirect to="/me"/>} />
                                
                                <Route path="/search" component={SearchViewContainer}/>

                                <Route 
                                    path="/artist/:artistID"
                                    render={({match}) => 
                                            <ArtistViewContainer 
                                                artistID={match.params.artistID} 
                                                url={match.url}
                                            />
                                    }
                                />
                                <Route path="/me" component={UserProfileViewContainer} />

                                <Route path="/browse" component={BrowseViewContainer} />

                                <Route 
                                    path="/album/:albumID" 
                                    render={({match}) => <AlbumViewContainer albumID={match.params.albumID} />}
                                />
                                <Route 
                                    path="/category/:category"
                                    render={({match}) => <CategoryViewContainer category={match.params.category} />}
                                />
                                <Route 
                                    path="/playlist/:ownerID/:playlistID"
                                    render={({match}) => <PlaylistViewContainer 
                                                            playlistID={match.params.playlistID}
                                                            ownerID={match.params.ownerID} 
                                                        />
                                            }
                                />
                            </Switch>
                            
                        </div>
                        <Player />
                        
                    </div>
            
                </BrowserRouter>
                <Portal>
                    <AddTrackModal />
                    <CreateNewPlaylistModal />
                    <ImageUploadModal />
                    <ErrorModal />
                </Portal>
                </div>
            );
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
)(App);
