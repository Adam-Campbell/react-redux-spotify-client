import React from 'react';
import PropTypes from 'prop-types';
import ArtistCollection from './ArtistCollection';
import FadeInContainer from './FadeInContainer';
import withFadeIn from './withFadeIn';
import withSlideIn from './withSlideIn';

const RelatedArtistsView = props => (
    <ArtistCollection 
        artistArray={props.artist.relatedArtists}
        title="Related Artists"
    />
);

RelatedArtistsView.propTypes = {
    artist: PropTypes.object
}

export default withFadeIn(RelatedArtistsView);
