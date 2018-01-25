import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Album from './Album';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const AlbumsView = props => {
    return (
        <ReactCSSTransitionGroup
            component="div"
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            transitionAppear={true}
            transitionAppearTimeout={500}
        >
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
        </ReactCSSTransitionGroup>
    );
}

AlbumsView.propTypes = {
    artistInfo: PropTypes.object,
    accessToken: PropTypes.string,
    playPauseTrack: PropTypes.func
}

export default AlbumsView;