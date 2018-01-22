import React from 'react';
import PropTypes from 'prop-types';
import ArtistCollection from './ArtistCollection';


const RelatedArtistsView = props => {
    return (
        <div>
            <ArtistCollection 
                artistArray={props.artistInfo.relatedArtists}
                title='Related Artists'
                fetchArtist={props.fetchArtist}
                accessToken={props.accessToken}
            />
        </div>
    );
}

RelatedArtistsView.propTypes = {
    artistInfo: PropTypes.object,
    accessToken: PropTypes.string,
    fetchArtist: PropTypes.func
}


export default RelatedArtistsView;
