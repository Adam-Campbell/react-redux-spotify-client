import React from 'react';
import PropTypes from 'prop-types';
import ArtistCollection from './ArtistCollection';
import FadeInContainer from './FadeInContainer';


const RelatedArtistsView = props => (
    <FadeInContainer>
        <ArtistCollection 
            artistArray={props.artist.relatedArtists}
            title="Related Artists"
        />
    </FadeInContainer>
);

RelatedArtistsView.propTypes = {
    artist: PropTypes.object
}

export default RelatedArtistsView;
