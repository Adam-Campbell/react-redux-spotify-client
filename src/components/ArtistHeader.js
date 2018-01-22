import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faMusic from '@fortawesome/fontawesome-free-solid/faMusic';

const ArtistHeader = props => {

    const genreString = props.genres.join(', ');

    return (
        <header className="artist-header">
            <div 
                className="artist-header__background-image-holder"
                style={
                    {
                        background: `linear-gradient(rgba(17, 17, 17, 0.2), #111111), url("${props.artistImage}")`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }
                }
            >
            </div>    
            <img className="artist-header__image" src={props.artistImage}></img>
            <div className="artist-header__content-holder">
                <h1 className="heading heading--large">{props.artistName}</h1>
                <div className="artist-header__genre-block-holder">
                    {
                        props.genres.map((genre, index) => {
                            return (
                                <div className="genre-block" key={index}>
                                    <FontAwesomeIcon icon={faMusic} />
                                    <p className="genre-block__text">{genre}</p>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </header>
    );
}


ArtistHeader.propTypes = {
    artistImage: PropTypes.string,
    artistName: PropTypes.string,
    genres: PropTypes.array
}

export default ArtistHeader;

