import React from 'react';
import PropTypes from 'prop-types';

const PlayerAudioElement = props => (
    <audio 
        id="audioElem" 
        src={props.previewURL}
        onEnded={
            () => {
                if (props.isRepeating) {
                    props.audioElement.currentTime = 0;
                    props.audioElement.play();
                } else {
                    props.skipToNextTrack();
                }  
            }
        }
    >
    </audio>
);

PlayerAudioElement.propTypes = {
    previewURL: PropTypes.string,
    isRepeating: PropTypes.bool,
    audioElement: PropTypes.object,
    skipToNextTrack: PropTypes.func
};

export default PlayerAudioElement;