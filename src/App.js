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


class App extends Component {

    constructor() {
        super();
        this.checkForAccessToken = this.checkForAccessToken.bind(this);
    }

    checkForAccessToken() {
        console.log('checkForAccessToken was called');
        const now = Date.now();
        const thresh = 10000;
        if(this.props.accessToken && now - this.props.accessToken.timestamp < thresh) {
            console.log('first block was entered!');
            return true;
        } else if (
                window.localStorage.accessToken && 
                now - JSON.parse(window.localStorage.accessToken).timestamp < thresh
        ) { 
            console.log('second block was entered!');
            const accessToken = JSON.parse(window.localStorage.accessToken);
            this.props.storeToken(accessToken);
            return true; 
        } else if (window.location.hash) {
            console.log('third block was entered!');
            const accessToken = {
                token: window.location.hash.replace(/.*access_token=([^&]+).*/, '$1'),
                timestamp: Date.now()
            };
            window.localStorage.setItem('accessToken', JSON.stringify(accessToken));
            this.props.storeToken(accessToken); 
            return true;
        } else {
            console.log('final block was entered!');
            return false;
        }
    }

    render() {
        if (this.checkForAccessToken()) {
            return(
                <BrowserRouter>
                    <div>
                        <Navigation accessToken={this.props.accessToken.token}/>
                        <TopBar />
                        <div className="main-container">
                            
                            <Switch>
                                <Route exact path="/" render={() => <Redirect to="/browse"/>} />
                                <Route path="/search" component={SearchView}/>
                                <Route path="/artist" component={ArtistGroupView} />
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
                                    path="/playlist/:userID/:playlistID"
                                    render={({match}) => <PlaylistView 
                                                            playlistID={match.params.playlistID}
                                                            userID={match.params.userID} 
                                                        />
                                            }
                                />
                            </Switch>
                            
                        </div>
                        <PlayerControls />
                        
                    </div>
                </BrowserRouter>
            );
        } else {
            window.location = "https://accounts.spotify.com/authorize?client_id=bc785a3e64da41a8a122a4458dc4afc3&response_type=token&redirect_uri=http:%2F%2Flocalhost:8080&show_dialog=false&scope=playlist-read-private,playlist-read-collaborative,user-follow-read,user-library-read,user-top-read,user-read-recently-played,user-read-playback-state";
            return null;
        }

    }
}


const mapStateToProps = state => {
    return {
        accessToken: state.accessToken,
        isFetchingArtist: state.isFetchingArtist,
        currentSearch: state.currentSearch,
        searchResults: state.searchResults,
        artistInfo: state.artistInfo
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
