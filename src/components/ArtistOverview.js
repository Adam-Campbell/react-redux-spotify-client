import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import ArtistCollection from './ArtistCollection';
import AlbumCollection from './AlbumCollection';
import InlineTrackCollection from './InlineTrackCollection';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';



const ArtistOverview = props => {
    return (
        <ReactCSSTransitionGroup
            component="div"
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            transitionAppear={true}
            transitionAppearTimeout={500}
        >
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
        </ReactCSSTransitionGroup>
    );
}


export default ArtistOverview;
