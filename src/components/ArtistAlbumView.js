import React from 'react';
import PropTypes from 'prop-types';
import Album from './Album';

const ArtistAlbumView = props => {
    const albumID = props.albumID; // passed in via URL 
    const albumIndex = props.artistInfo.albums.findIndex(album => album.albumID === albumID);
    const album = props.artistInfo.albums[albumIndex];

    return (
        <Album 
            albumName={album.albumName}
            albumID={album.albumID}
            artistName={album.artistName}
            releaseDate={album.releaseDate}
            albumImage={album.albumImage}
            albumTracks={album.albumTracks}
            playPauseTrack={props.playPauseTrack}
            currentlySelectedCollection={props.currentlySelectedCollection}
        />
    );
}


ArtistAlbumView.propTypes = {
    albumID: PropTypes.string,
    artistInfo: PropTypes.object,
    accessToken: PropTypes.string,
    playPauseTrack: PropTypes.func
}


export default ArtistAlbumView;

