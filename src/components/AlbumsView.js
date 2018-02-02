import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlbumCollection from './AlbumCollection';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const AlbumsView = props => {

    const albums = props.artist.albums.filter(album => album.albumType === 'album');
    const singles = props.artist.albums.filter(album => album.albumType === 'single');

    return (
        <ReactCSSTransitionGroup
            component="div"
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            transitionAppear={true}
            transitionAppearTimeout={500}
        >
            <AlbumCollection 
                albumArray={albums}
                title="Albums"
            />

            <AlbumCollection 
                albumArray={singles}
                title="Singles"  
            />
        </ReactCSSTransitionGroup>
    );
}

AlbumsView.propTypes = {
    artist: PropTypes.object,
    //accessToken: PropTypes.string,
    //playPauseTrack: PropTypes.func
}

export default AlbumsView;