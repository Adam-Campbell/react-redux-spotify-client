import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Album from './Album';

const AlbumsView = props => {
    return (
        <div>
            {
                props.artistInfo.albums.map(album => {
                    return (
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
                    );
                })
            }
        </div>
    );
}

AlbumsView.propTypes = {
    artistInfo: PropTypes.object,
    accessToken: PropTypes.string,
    playPauseTrack: PropTypes.func
}

export default AlbumsView;