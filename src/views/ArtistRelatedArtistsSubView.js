import React from 'react';
import PropTypes from 'prop-types';
import ArtistCollection from '../components/ArtistCollection';

const ArtistRelatedArtistsSubView = props => (
    <div className="fade-into-view">
        <ArtistCollection 
            artistArray={props.artist.relatedArtists}
            title="Related Artists"
        />
    </div>
);

ArtistRelatedArtistsSubView.propTypes = {
    artist: PropTypes.object
}

export default ArtistRelatedArtistsSubView;
