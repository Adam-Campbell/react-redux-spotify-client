import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PlaylistCollectionItem = props => {
    return (
        <div className="album-collection-item">
            <Link to={`/playlist/${props.ownerID}/${props.playlistID}`} className="album-collection-item__link">
                <img src={props.playlistImage} alt="" className="album-collection-item__image"></img>
                <p className="album-collection-item__name">{props.playlistName}</p>
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