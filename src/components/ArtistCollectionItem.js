import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ArtistCollectionItem = props => {
    return (
        <div className="artist-collection-item">
            <Link
                to="/artist"
                className="artist-collection-item__link"
                onClick={() => props.fetchArtist(props.artistID, props.accessToken)}
            >
                <div
                    className="artist-collection-item__image"
                    style={{backgroundImage: `url('${props.artistImage}')`}}
                >
                </div>
                <p className="artist-collection-item__name">{props.artistName}</p>
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