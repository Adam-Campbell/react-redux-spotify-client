import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Navigation from '../components/Navigation';
import TopBar from '../components/TopBar';
import Player from '../components/Player';

import ArtistViewContainer from './ArtistViewContainer';
import AlbumViewContainer from './AlbumViewContainer';
import PlaylistViewContainer from './PlaylistViewContainer';
import CategoryViewContainer from './CategoryViewContainer';
import SearchViewContainer from './SearchViewContainer';
import UserProfileViewContainer from './UserProfileViewContainer';
import BrowseViewContainer from './BrowseViewContainer';

import Portal from '../components/Portal';
import AddTrackModal from '../components/AddTrackModal';
import CreateNewPlaylistModal from '../components/CreateNewPlaylistModal';
import ImageUploadModal from '../components/ImageUploadModal';
import ErrorModal from '../components/ErrorModal';


const AppPresenter = props => (
    <div className={props.isShowingNav ? "nav-open" : undefined}>
        <BrowserRouter>
            <div>
                <Navigation toggleNav={props.toggleNav}/>
                <TopBar toggleNav={props.toggleNav}/>
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

export default AppPresenter; 