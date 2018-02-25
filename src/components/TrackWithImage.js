import React from 'react';
import PropTypes from 'prop-types';
import Track from './Track';

const TrackWithImage = props => (
    <Track {...props} showImage={true} showNumber={false} />
);

export default TrackWithImage;
