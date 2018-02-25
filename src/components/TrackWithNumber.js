import React from 'react';
import PropTypes from 'prop-types';
import Track from './Track';

const TrackWithNumber = props => (
    <Track {...props} showImage={false} showNumber={true} />
);


export default TrackWithNumber;