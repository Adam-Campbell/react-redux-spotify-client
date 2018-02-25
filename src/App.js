import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from './actions';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import SearchView from './components/SearchView';
import SignIn from './components/SignIn';
import Navigation from './components/Navigation';
import TopBar from './components/TopBar';
import PlayerControls from './components/PlayerControls';
import UserProfileView from './components/UserProfileView';
import BrowseView from './components/BrowseView';
import ArtistGroupView from './components/ArtistGroupView';
import OrphanAlbumView from './components/OrphanAlbumView';
import CategoryView from './components/CategoryView';
import PlaylistView from './components/PlaylistView';
import Portal from './components/Portal';
import AddTrackModal from './components/AddTrackModal';
import CreateNewPlaylistModal from './components/CreateNewPlaylistModal';
import ImageUploadModal from './components/ImageUploadModal';
import ErrorModal from './components/ErrorModal';
import { authURL } from './globalConstants';

class App extends Component {

    constructor() {
        super();
        this.checkForAccessToken = this.checkForAccessToken.bind(this);
    }

    saveTokenToLocalStorage(accessToken) {
        try {
            const JSONAccessToken = JSON.stringify(accessToken);
            localStorage.setItem('accessToken', JSONAccessToken);
        } catch(err) {
            console.log(err);
        }
    }

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
                                <Route path="/search" component={SearchView}/>
                                <Route 
                                    path="/artist/:artistID"
                                    render={({match}) => <ArtistGroupView 
                                                            artistID={match.params.artistID} 
                                                            url={match.url}
                                                        />
                                            } 
                                />
                                <Route path="/me" component={UserProfileView} />
                                <Route path="/browse" component={BrowseView} />
                                <Route 
                                    path="/album/:albumID" 
                                    render={({match}) => <OrphanAlbumView albumID={match.params.albumID} />}
                                />
                                <Route 
                                    path="/category/:category"
                                    render={({match}) => <CategoryView category={match.params.category} />}
                                />
                                <Route 
                                    path="/playlist/:ownerID/:playlistID"
                                    render={({match}) => <PlaylistView 
                                                            playlistID={match.params.playlistID}
                                                            ownerID={match.params.ownerID} 
                                                        />
                                            }
                                />
                            </Switch>
                            
                        </div>
                        <PlayerControls />
                        
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
