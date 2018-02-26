import React from 'react';
import PropTypes from 'prop-types';

const PlayerVolumeControls = props => (
    <div 
        className="volume-control--outer"
        onClick={props.changeVolume}
    >
            <div className="volume-control--inner"></div>
    </div>
);

PlayerVolumeControls.propTypes = {
    changeVolume: PropTypes.func
};

export default PlayerVolumeControls;