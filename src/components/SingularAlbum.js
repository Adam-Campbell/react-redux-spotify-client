import React from 'react';
import PropTypes from 'prop-types';
import Album from './Album';

const SingularAlbum = props => {
    const albumID = props.albumID;
    const albumIndex = props.artistInfo.albums.findIndex(album => album.albumID === albumID);
    const album = props.artistInfo.albums[albumIndex];

    return (
        <div>
            <Album 
                albumName={album.albumName}
                artistName={album.artistName}
                albumID={album.albumID}
                key={album.albumID}
                releaseDate={album.releaseDate}
                albumImage={album.albumImage}
                albumTracks={album.albumTracks}
                playPauseTrack={props.playPauseTrack}
                currentlySelectedCollection={props.currentlySelectedCollection}
            />
        </div>
    )
}


SingularAlbum.propTypes = {
    albumID: PropTypes.string,
    artistInfo: PropTypes.object,
    accessToken: PropTypes.string,
    playPauseTrack: PropTypes.func
}


export default SingularAlbum;

