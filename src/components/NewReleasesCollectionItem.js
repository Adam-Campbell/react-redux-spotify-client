import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowAltCircleRight from '@fortawesome/fontawesome-free-solid/faArrowAltCircleRight';

const NewReleasesCollectionItem = props => {
    return (
        <div className="card-collection__card-holder">
            <Link 
                to={`/album/${props.albumID}`}
                className="card"
            >
                <div className="card__image-outer">
                    <div className="card__image-inner" style={{backgroundImage: `url('${props.albumImage}')`}}></div>
                    <div className="card__image-overlay">
                        <FontAwesomeIcon icon={faArrowAltCircleRight} />
                    </div>
                </div>
                <p className="card__text card__text--condensed">{props.albumName}</p>
                <p className="card__text--small">{props.artistName}</p>
            </Link>
        </div>
    );
}


NewReleasesCollectionItem.propTypes = {
    albumName: PropTypes.string,
    albumID: PropTypes.string,
    albumImage: PropTypes.string,
    artistName: PropTypes.string,
    artistID: PropTypes.string
}

export default NewReleasesCollectionItem;

