/*
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
import TrackCollection from './TrackCollection';

class ArtistOverview extends Component {

    render() {
        if (this.props.isFetchingArtist) {
            return (
                <p>Artist is currently being fetched</p>
            )
        } else if (!this.props.artistInfo.id) {
            return (
                <p>Please select an artist using the search screen.</p>
            )
        }
        return (
            <div>
                <ArtistHeader 
                    image={this.props.artistInfo.image}
                    name={this.props.artistInfo.name}
                    genres={this.props.artistInfo.genres}
                />
                <div className="container">
                    <TrackCollection 
                        trackArray={this.props.artistInfo.topTracks}
                        title="Popular Tracks"
                        playPauseTrack={this.props.playPauseTrack}
                    />
                    <AlbumCollection 
                        albumArray={this.props.artistInfo.albums}
                        title="Albums"
                        accessToken={this.props.accessToken}
                    />
                    <ArtistCollection 
                        artistArray={this.props.artistInfo.relatedArtists.slice(0,5)}
                        title='Related Artists'
                        accessToken={this.props.accessToken}
                        fetchArtist={this.props.fetchArtist}
                    />

                </div>
            </div>
        );
    }

}


const mapStateToProps = state => {
    return {
        artistInfo: state.artistInfo,
        isFetchingArtist: state.isFetchingArtist,
        accessToken: state.accessToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchArtist(id, token) {
            dispatch(
                ActionCreators.fetchArtist(id, token)
            );
        },
        playPauseTrack(trackID) {
            dispatch(
                ActionCreators.playPauseTrack(trackID)
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistOverview);
*/


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
import InlineTrackCollection from './InlineTrackCollection';



const ArtistOverview = props => {
    return (
        <div>
            <InlineTrackCollection 
                trackArray={props.artistInfo.topTracks}
                title="Popular Tracks"
                playPauseTrack={props.playPauseTrack}
                currentlySelectedCollection={props.currentlySelectedCollection}
            />
            <AlbumCollection 
                albumArray={props.artistInfo.albums}
                title="Albums"
                accessToken={props.accessToken}
            />
            <ArtistCollection 
                artistArray={props.artistInfo.relatedArtists.slice(0,5)}
                title='Related Artists'
                accessToken={props.accessToken}
                fetchArtist={props.fetchArtist}
            />
        </div>
    );
}


export default ArtistOverview;
