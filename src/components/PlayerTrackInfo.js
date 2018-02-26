import React from 'react';
import PropTypes from 'prop-types';

const PlayerTrackInfo = props => (
    <div className="track-info">
        <img className="track-info__image" src={props.albumImage}></img>
        <div className="track-info__text-container">
            <p className="track-info__track-name">{props.trackName}</p>
            <p className="track-info__artist-name">{props.artistName}</p>
        </div>
    </div>
);

PlayerTrackInfo.propTypes = {
    albumImage: PropTypes.string,
    trackName: PropTypes.string,
    artistName: PropTypes.string
};

export default PlayerTrackInfo;