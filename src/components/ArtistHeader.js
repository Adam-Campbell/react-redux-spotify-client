import React from 'react';
import PropTypes from 'prop-types';

const ArtistHeader = props => {

    const genreString = props.genres.join(', ');

    return (
        <header className="artist-header">
            <img className="artist-header__image" src={props.image} alt=""></img>
            <div 
                className="artist-header__background-image" 
                style={
                        {
                            background: `linear-gradient(rgba(17, 17, 17, 0.2), #111111), url("${props.image}")`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }
                    }
            >
            </div>
            <div className="artist-header__info-container">
                <h1 className="artist-header__artist-name">{props.name}</h1>
                <p className="artist-header__artist-genres">{genreString}</p>
            </div>
        </header>
    );
}

ArtistHeader.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    genres: PropTypes.array
}

export default ArtistHeader;

