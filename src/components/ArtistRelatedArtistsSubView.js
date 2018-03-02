import React from 'react';
import PropTypes from 'prop-types';
import ArtistCollection from './ArtistCollection';
import FadeInContainer from './FadeInContainer';
import withFadeIn from './withFadeIn';
import withSlideIn from './withSlideIn';

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
