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



class App extends Component {

    constructor() {
        super();
        this.checkForAccessToken = this.checkForAccessToken.bind(this);
    }

    // checkForAccessToken() {
    //     console.log('checkForAccessToken was called');
    //     const now = Date.now();
    //     const thresh = 3500000;
    //     if(this.props.accessToken && now - this.props.accessToken.timestamp < thresh) {
    //         console.log('first block was entered!');
    //         return true;
    //     } else if (
    //             window.localStorage.accessToken && 
    //             now - JSON.parse(window.localStorage.accessToken).timestamp < thresh
    //     ) { 
    //         console.log('second block was entered!');
    //         const accessToken = JSON.parse(window.localStorage.accessToken);
    //         this.props.storeToken(accessToken);
    //         return true; 
    //     } else if (window.location.hash) {
    //         console.log('third block was entered!');
    //         const accessToken = {
    //             token: window.location.hash.replace(/.*access_token=([^&]+).*/, '$1'),
    //             timestamp: Date.now()
    //         };
    //         window.localStorage.setItem('accessToken', JSON.stringify(accessToken));
    //         this.props.storeToken(accessToken); 
    //         return true;
    //     } else {
    //         console.log('final block was entered!');
    //         return false;
    //     }
    // }

    // checkForAccessToken() {
    //     if (this.props.accessToken.token) {
    //         console.log('first block was entered');
    //         return true;
    //     }
    //     else if (window.location.hash) {
    //         console.log('second block was entered');
    //         const accessToken = {
    //             token: window.location.hash.replace(/.*access_token=([^&]+).*/, '$1'),
    //             timestamp: Date.now()
    //         };
    //         this.props.storeToken(accessToken);
    //         saveTokenToStorage(accessToken);
    //         return true;
    //     } else {
    //         console.log('third block was entered');
    //         return false;
    //     }
    // }

    checkForAccessToken() {
        if (this.props.accessToken) {
            return true;
        }
        else if (window.location.hash) {
            const accessToken = window.location.hash.replace(/.*access_token=([^&]+).*/, '$1');    
            this.props.storeToken(accessToken);
            return true;
        } else {
            return false;
        }
    }

    render() {
        
        if (this.checkForAccessToken()) {
            return(
                <div>
                <BrowserRouter>
                    <div>
                        <Navigation accessToken={this.props.accessToken}/>
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
            return <SignIn />
        }

    }
}

const mapStateToProps = state => {
    return {
        accessToken: state.accessToken,
        //isFetchingArtist: state.isFetchingArtist,
        //currentSearch: state.currentSearch,
        //searchResults: state.searchResults,
        //artistInfo: state.artistInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        storeToken(token) {
            dispatch(
                ActionCreators.storeToken(token)
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
