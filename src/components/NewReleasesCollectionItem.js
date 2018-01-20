import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NewReleasesCollectionItem = props => {
    return (
        <div className="album-collection-item">
            <Link to={`/album/${props.albumID}`} className="album-collection-item__link">
                <img src={props.albumImage} alt="" className="album-collection-item__image"></img>
                <p className="album-collection-item__name">{props.albumName}</p>
                <p className="album-collection-item__postText">{props.artistName}</p>
            </Link>
        </div>
    );
}


NewReleasesCollectionItem.propTypes = {
    albumName: PropTypes.string,
    albumID: PropTypes.string,
    albummage: PropTypes.string,
    artistName: PropTypes.string,
    artistID: PropTypes.string
}

export default NewReleasesCollectionItem;

