import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlayCircle from '@fortawesome/fontawesome-free-solid/faPlayCircle';
import faPauseCircle from '@fortawesome/fontawesome-free-solid/faPauseCircle';
import faStepBackward from '@fortawesome/fontawesome-free-solid/faStepBackward';
import faStepForward from '@fortawesome/fontawesome-free-solid/faStepForward';
import faRandom from '@fortawesome/fontawesome-free-solid/faRandom';
import faSyncAlt from '@fortawesome/fontawesome-free-solid/faSyncAlt';

const PlayerControls = props => (
    <div className="controls-container">

        <FontAwesomeIcon 
            icon={faRandom}
            className={
                (props.isShuffled) ?
                "icon--green" :
                ""
            } 
            onClick={
                () => {
                    if (props.isShuffled) {
                        props.unshuffleCurrentCollection();
                    } else {
                        props.shuffleCurrentCollection();
                    }
                }
            }
        />

        <FontAwesomeIcon 
            icon={faStepBackward} 
            onClick={
                () => {
                    if (props.audioElement.currentTime <= 3) {
                        props.skipToPreviousTrack()
                    } else {
                        props.audioElement.currentTime = 0;
                        props.audioElement.play();
                    }
                }
            }
        />
        <FontAwesomeIcon 
            icon={(props.isPlaying) ? faPauseCircle : faPlayCircle} 
            onClick={props.playPause}
        />
        <FontAwesomeIcon 
            icon={faStepForward}
            onClick={props.skipToNextTrack} 
        />
        <FontAwesomeIcon 
            icon={faSyncAlt}
            className={
                (props.isRepeating) ?
                "icon--green" :
                ""
            } 
            onClick={props.toggleRepeat} 
        />
        <div 
            className="progress-bar--outer"
            onClick={props.scrubTrack}
        >
            <div className="progress-bar--inner"></div>
        </div>
    </div>
);

PlayerControls.propTypes = {
    isShuffled: PropTypes.bool,
    isRepeating: PropTypes.bool,
    isPlaying: PropTypes.bool,
    shuffleCurrentCollection: PropTypes.func,
    unshuffleCurrentCollection: PropTypes.func,
    skipToPreviousTrack: PropTypes.func,
    skipToNextTrack: PropTypes.func,
    playPause: PropTypes.func,
    scrubTrack: PropTypes.func,
    toggleRepeat: PropTypes.func,
    audioElement: PropTypes.object,
};

export default PlayerControls;