import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import ArtistHeader from './ArtistHeader';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import ArtistOverview from './ArtistOverview';
import AlbumsView from './AlbumsView';
import RelatedArtistsView from './RelatedArtistsView';
import InlineNav from './InlineNav';
import Loader from './Loader';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class ArtistGroupView extends Component {

    componentDidMount() {
        console.log('component did mount!');
        if (!this.props.artists.artistData.hasOwnProperty(this.props.artistID)) {
            this.props.fetchArtist(this.props.artistID, this.props.accessToken);  
        }
        this.props.switchCurrentArtist(this.props.artistID);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.artistID !== this.props.artistID) {
            this.props.fetchArtist(this.props.artistID, this.props.accessToken);
            this.props.switchCurrentArtist(this.props.artistID);
        }
    }


    render() {
        const artistID = this.props.artistID;
        const url = this.props.url;
        console.log(url);
        console.log(`The artistID is ${artistID}`);

        if (this.props.artists.artistData.hasOwnProperty(artistID)) { 
            const artist = this.props.artists.artistData[artistID];
            return (
                <div>
                    <ArtistHeader 
                        artistImage={artist.artistImage}
                        artistName={artist.artistName}
                        genres={artist.genres}
                    />

                    <InlineNav 
                        currentArtist={artistID}
                    />
                    <Switch>
                        <Route 
                            path={`${url}/albums`}
                            render={
                                () => <AlbumsView 
                                        artist={artist}  
                                    />
                            }
                        />

                        <Route 
                            path={`${url}/related-artists`}
                            render={
                                () => <RelatedArtistsView 
                                        artist={artist}
                                        
                                    />
                            }
                        />

                        <Route 
                            path={`${url}/overview`} 
                            render={
                                () => <ArtistOverview 
                                        artist={artist}
                                        accessToken={this.props.accessToken}
                                        fetchArtist={this.props.fetchArtist}
                                        playPauseTrack={this.props.playPauseArtistTopTrack}
                                        currentlySelectedCollection={this.props.currentlySelectedCollection}
                                    />
                            } 
                        />
                        <Route 
                            path={'/'}
                            render={() => <Redirect to={`${url}/overview`}/>}
                        />
                    </Switch>
                        
                </div>
            );
        } else if (this.props.artists.isFetching) {
            return <Loader />
        } else {
            return null;
        }
    }

}


const mapStateToProps = state => {
    return {
        artists: state.artistInfo,
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
        switchCurrentArtist(id) {
            dispatch(
                ActionCreators.switchCurrentArtist(id)
            );
        },
        playPauseArtistTopTrack(trackID, identifier) {
            dispatch(
                ActionCreators.playPauseArtistTopTrack(trackID, identifier)
            );
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArtistGroupView));