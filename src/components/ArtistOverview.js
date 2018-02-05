import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import ArtistCollection from './ArtistCollection';
import AlbumCollection from './AlbumCollection';
import InlineTrackCollection from './InlineTrackCollection';
import Button from './Button';
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
                trackArray={props.artist.topTracks}
                title="Popular Tracks"
                playPauseTrack={props.playPauseTrack}
                currentlySelectedCollection={props.currentlySelectedCollection}
            />
            <AlbumCollection 
                albumArray={
                    props.artist.albums.filter(album => album.albumType === "album")
                    .slice(0,6)
                }
                title="Albums"
                accessToken={props.accessToken}
            />
            

            <Button 
                linkTo={`/artist/${props.artist.artistID}/albums`}
                anchorText="View All Albums"
            />

            <ArtistCollection 
                artistArray={props.artist.relatedArtists.slice(0,6)}
                title='Related Artists'
                accessToken={props.accessToken}
                fetchArtist={props.fetchArtist}
            />

            <Button 
                linkTo={`/artist/${props.artist.artistID}/related-artists`}
                anchorText="View All Related Artists"
            />
        </ReactCSSTransitionGroup>
    );
}


export default ArtistOverview;
