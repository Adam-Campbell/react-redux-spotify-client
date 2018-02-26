import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faMusic from '@fortawesome/fontawesome-free-solid/faMusic';

const ArtistHeader = props => (
    <header className="artist-header">
        <div 
            className="artist-header__background-image-holder"
            style={ {backgroundImage: `url("${props.artistImage}")`} }
        >
        </div>
        <div className="artist-header__gradient-holder"></div>   
        <div className="artist-header__flex-layout-helper"> 
            <img className="artist-header__image" src={props.artistImage}></img>
            <div className="artist-header__content-holder">
                <h1 className="heading heading--large">{props.artistName}</h1>
                <div className="artist-header__genre-block-holder">
                    {props.genres.map((genre, index) => (
                        <div className="genre-block" key={index}>
                            <FontAwesomeIcon icon={faMusic} />
                            <p className="genre-block__text">{genre}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </header>
);



ArtistHeader.propTypes = {
    artistImage: PropTypes.string,
    artistName: PropTypes.string,
    genres: PropTypes.array
}

export default ArtistHeader;

