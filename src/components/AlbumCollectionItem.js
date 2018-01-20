import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AlbumCollectionItem = props => {
    return (
        <div className="album-collection-item">
            <Link to={`/artist/album/${props.albumID}`} className="album-collection-item__link">
                <img src={props.albumImage} alt="" className="album-collection-item__image"></img>
                <p className="album-collection-item__name">{props.albumName}</p>
            </Link>
        </div>
    );
}

AlbumCollectionItem.propTypes = {
    albumImage: PropTypes.string,
    albumName: PropTypes.string,
    albumID: PropTypes.string
}

export default AlbumCollectionItem;