import React from 'react';
import PropTypes from 'prop-types';

const AlbumCard = props => {
    return (
        <div className="album-card">
            <img src={props.image} alt="" className="album-card__image"></img>
            <p className="album-card__name">{props.name}</p>
        </div>
    );
}

AlbumCard.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string
};

export default AlbumCard;
