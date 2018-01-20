import React from 'react';
import PropTypes from 'prop-types';

const ArtistCard = props => {
    return (
        <div className="artist-card">
            <div className="artist-card__image-holder" style={{backgroundImage: `url('${props.image}')`}}></div>
            <p className="artist-card__name">{props.name}</p>
        </div>       
    );
}

ArtistCard.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.string
};

export default ArtistCard;