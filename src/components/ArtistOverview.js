import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
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
