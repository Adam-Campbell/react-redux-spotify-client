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
        if(this.props.accessToken) {
            return true;
        } else if (window.location.hash) {
            let token = window.location.hash.split('#access_token=')[1].split('&')[0];
            this.props.storeToken(token); 
            return true;
        } else {
            return false;
        }
    }

    render() {

        if (this.checkForAccessToken()) {
            return(
                <BrowserRouter>
                    <div>
                        <Navigation accessToken={this.props.accessToken}/>
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
                            <PlayerControls />
                        </div>
                    </div>
                </BrowserRouter>
            );
        } else {
            return (
                <SignIn />
            );
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

