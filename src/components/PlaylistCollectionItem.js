import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowAltCircleRight from '@fortawesome/fontawesome-free-solid/faArrowAltCircleRight';

const PlaylistCollectionItem = props => {
    return (
        <div className="card-collection__card-holder">
            <Link 
                to={`/playlist/${props.ownerID}/${props.playlistID}`}
                className="card"
            >
                <div className="card__image-outer">
                    <div className="card__image-inner" style={{backgroundImage: `url('${props.playlistImage}')`}}></div>
                    <div className="card__image-overlay">
                        <FontAwesomeIcon icon={faArrowAltCircleRight} />
                    </div>
                </div>
                <p className="card__text">{props.playlistName}</p>
            </Link>
        </div>
    );
}


PlaylistCollectionItem.propTypes = {
    playlistImage: PropTypes.string,
    playlistName: PropTypes.string,
    playlistID: PropTypes.string,
    ownerID: PropTypes.string
}

export default PlaylistCollectionItem;