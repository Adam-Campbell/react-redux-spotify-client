import React from 'react';
import PropTypes from 'prop-types';

const PlayerAudioElement = props => (
    <audio 
        id="audioElem" 
        src={props.previewURL}
        ref={props.audioElementRef}
        onEnded={
            () => {
                if (props.isRepeating) {
                    props.audio.currentTime = 0;
                    props.audio.play();
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