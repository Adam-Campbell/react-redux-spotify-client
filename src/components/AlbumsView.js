import React from 'react';
import PropTypes from 'prop-types';
import AlbumCollection from './AlbumCollection';
import FadeInContainer from './FadeInContainer';
import withFadeIn from './withFadeIn';
import withSlideIn from './withSlideIn';

const AlbumsView = props => {

    const albums = props.artist.albums.filter(album => album.albumType === 'album');
    const singles = props.artist.albums.filter(album => album.albumType === 'single');

    return (
        
            <div>
                <AlbumCollection 
                    albumArray={albums}
                    title="Albums"
                />

                <AlbumCollection 
                    albumArray={singles}
                    title="Singles"  
                />
            </div>
        
    );
}

AlbumsView.propTypes = {
    artist: PropTypes.object,
}

export default withFadeIn(AlbumsView);