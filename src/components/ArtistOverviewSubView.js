import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArtistCollection from './ArtistCollection';
import AlbumCollection from './AlbumCollection';
import InlineTrackCollection from './InlineTrackCollection';
import Button from './Button';
import FadeInContainer from './FadeInContainer';
import withFadeIn from './withFadeIn';
import withSlideIn from './withSlideIn';


const ArtistOverviewSubView = props => (
    
        <div className="fade-into-view">
            <InlineTrackCollection 
                trackArray={props.artist.topTracks}
                title="Popular Tracks"
                playPauseTrack={props.playPauseTrack}
                currentlySelectedCollection={props.currentlySelectedCollection}
            />

            <AlbumCollection 
                albumArray={props.artist.albums.filter(album => album.albumType === "album").slice(0,6)}
                title="Albums"
                accessToken={props.accessToken}
            >
                <Button 
                    linkTo={`/artist/${props.artist.artistID}/music`}
                    anchorText="View All Music"
                />
            </AlbumCollection>


            <ArtistCollection 
                artistArray={props.artist.relatedArtists.slice(0,6)}
                title='Related Artists'
                accessToken={props.accessToken}
                fetchArtist={props.fetchArtist}
            >
                <Button 
                    linkTo={`/artist/${props.artist.artistID}/related-artists`}
                    anchorText="View All Related Artists"
                />
            </ArtistCollection>
        </div>
    
);


ArtistOverviewSubView.propTypes = {
    artist: PropTypes.object,
    playPauseTrack: PropTypes.func,
    currentlySelectedCollection: PropTypes.object
};


export default ArtistOverviewSubView;
