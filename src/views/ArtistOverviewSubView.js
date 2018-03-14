import React from 'react';
import PropTypes from 'prop-types';
import ArtistCollection from '../components/ArtistCollection';
import AlbumCollection from '../components/AlbumCollection';
import InlineTrackCollection from '../components/InlineTrackCollection';
import Button from '../components/Button';

const ArtistOverviewSubView = props => (
    
        <div className="fade-into-view">
            <InlineTrackCollection 
                trackArray={props.artist.topTracks}
                title="Popular Tracks"
                playPauseTrack={props.playPauseTrack}
                currentlySelectedCollection={props.currentlySelectedCollection}
            />

            <AlbumCollection 
                albumArray={[
                    ...props.artist.albums.filter(album => album.albumType === "album"),
                    ...props.artist.albums.filter(album => album.albumType === "single")
                ].slice(0,10)}
                title="Music"
                accessToken={props.accessToken}
            >
                <Button 
                    linkTo={`/artist/${props.artist.artistID}/music`}
                    anchorText="View All Music"
                />
            </AlbumCollection>


            <ArtistCollection 
                artistArray={props.artist.relatedArtists.slice(0,10)}
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
