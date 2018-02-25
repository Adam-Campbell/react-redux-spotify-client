import React from 'react';
import PropTypes from 'prop-types';
import AlbumCollection from './AlbumCollection';
import FadeInContainer from './FadeInContainer';

const AlbumsView = props => {

    const albums = props.artist.albums.filter(album => album.albumType === 'album');
    const singles = props.artist.albums.filter(album => album.albumType === 'single');

    return (
        <FadeInContainer>
            <AlbumCollection 
                albumArray={albums}
                title="Albums"
            />

            <AlbumCollection 
                albumArray={singles}
                title="Singles"  
            />
        </FadeInContainer>
    );
}

AlbumsView.propTypes = {
    artist: PropTypes.object,
}

export default AlbumsView;