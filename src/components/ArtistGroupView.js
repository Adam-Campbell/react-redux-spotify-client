import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';

import TopBar from './TopBar';
import ArtistHeader from './ArtistHeader';
import AlbumsOverview from './AlbumsOverview';
import RelatedArtistsOverview from './RelatedArtistsOverview';
import ArtistCollection from './ArtistCollection';
import AlbumCollection from './AlbumCollection';
//import TrackCollection from './TrackCollection';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ArtistOverview from './ArtistOverview';
import AlbumsView from './AlbumsView';
import RelatedArtistsView from './RelatedArtistsView';
import SingularAlbum from './SingularAlbum';
import InlineNav from './InlineNav';

class ArtistGroupView extends Component {

    render() {
        if (this.props.isFetchingArtist) {
            return (
                <p>Artist is currently being fetched</p>
            )
        } else if (!this.props.artistInfo.artistID) {
            return (
                <p>Please select an artist using the search screen.</p>
            )
        }
        return (
            <div>
                <ArtistHeader 
                    artistImage={this.props.artistInfo.artistImage}
                    artistName={this.props.artistInfo.artistName}
                    genres={this.props.artistInfo.genres}
                />

                <InlineNav />
                    
                        <Switch>
                            <Route 
                                path={`${this.props.match.url}/albums`}
                                render={
                                    () => <AlbumsView 
                                            artistInfo={this.props.artistInfo}
                                            accessToken={this.props.accessToken}
                                            playPauseTrack={this.props.playPauseArtistAlbumTrack}
                                            currentlySelectedCollection={this.props.currentlySelectedCollection}
                                        />
                                }
                            />

                            <Route 
                                path={`${this.props.match.url}/related-artists`}
                                render={
                                    () => <RelatedArtistsView 
                                            artistInfo={this.props.artistInfo}
                                            accessToken={this.props.accessToken}
                                            fetchArtist={this.props.fetchArtist}
                                        />
                                }
                            />

                            <Route 
                                path={`${this.props.match.url}/album/:albumID`}
                                render={({match}) => <SingularAlbum 
                                                        albumID={match.params.albumID}
                                                        artistInfo={this.props.artistInfo}
                                                        accessToken={this.props.accessToken}
                                                        playPauseTrack={this.props.playPauseArtistAlbumTrack}
                                                        currentlySelectedCollection={this.props.currentlySelectedCollection}
                                                    />
                                                }
                            />

                            <Route 
                                path={`${this.props.match.url}/`} 
                                render={
                                    () => <ArtistOverview 
                                            artistInfo={this.props.artistInfo}
                                            accessToken={this.props.accessToken}
                                            fetchArtist={this.props.fetchArtist}
                                            playPauseTrack={this.props.playPauseArtistTopTrack}
                                            currentlySelectedCollection={this.props.currentlySelectedCollection}
                                        />
                                } 
                            />
                        </Switch>
                   
                    
            </div>
        );
    }

}


const mapStateToProps = state => {
    return {
        artistInfo: state.artistInfo,
        isFetchingArtist: state.isFetchingArtist,
        accessToken: state.accessToken,
        currentlySelectedCollection: state.currentlySelectedCollection
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchArtist(id, token) {
            dispatch(
                ActionCreators.fetchArtist(id, token)
            );
        },
        playPauseArtistTopTrack(trackID, identifier) {
            dispatch(
                ActionCreators.playPauseArtistTopTrack(trackID, identifier)
            );
        },
        playPauseArtistAlbumTrack(trackID, identifier) {
            dispatch(
                ActionCreators.playPauseArtistAlbumTrack(trackID, identifier)
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistGroupView);