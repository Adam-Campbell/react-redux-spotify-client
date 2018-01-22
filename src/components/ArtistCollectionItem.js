import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowAltCircleRight from '@fortawesome/fontawesome-free-solid/faArrowAltCircleRight';

const ArtistCollectionItem = props => {
    return (
        <div className="card-collection__card-holder">
            <Link 
                to="/artist/overview"
                className="card"
                onClick={() => props.fetchArtist(props.artistID, props.accessToken)}
            >
                <div className="card__image-outer card__image-outer--rounded">
                    <div className="card__image-inner" style={{backgroundImage: `url('${props.artistImage}')`}}></div>
                    <div className="card__image-overlay">
                        <FontAwesomeIcon icon={faArrowAltCircleRight} />
                    </div>
                </div>
                <p className="card__text">{props.artistName}</p>
            </Link>
        </div>
    );
}


ArtistCollectionItem.propTypes = {
    artistName: PropTypes.string.isRequired,
    artistID: PropTypes.string.isRequired,
    artistImage: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    fetchArtist: PropTypes.func.isRequired
};

export default ArtistCollectionItem;