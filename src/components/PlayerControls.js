import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlayCircle from '@fortawesome/fontawesome-free-solid/faPlayCircle';
import faPauseCircle from '@fortawesome/fontawesome-free-solid/faPauseCircle';
import faStepBackward from '@fortawesome/fontawesome-free-solid/faStepBackward';
import faStepForward from '@fortawesome/fontawesome-free-solid/faStepForward';
import faRandom from '@fortawesome/fontawesome-free-solid/faRandom';
import faSyncAlt from '@fortawesome/fontawesome-free-solid/faSyncAlt';

class PlayerControls extends Component {

    constructor(props) {
        super(props);
        this.scrubTrack = this.scrubTrack.bind(this);
        this.state = {
            trackProgressPercent: 0
        }
    }


    // This function initializes the setInterval that ensures that the progress bar stays in sync
    // with the track progress.
    componentDidMount() {
        setInterval(() => {
            if (this.props.audio) {
                this.setState({
                    trackProgressPercent: (this.props.audio.currentTime * 100) / this.props.audio.duration
                });
            }
        }, 50);
    }

    // When the user interacts with the scrub bar this function works out which point in the song
    // the users 'scrub' action maps to, and moves the song to that point. It doesn't update the 
    // scrub bar itself, because this is updated via a setInterval initialized in componentDidMount.
    scrubTrack(e) {
        const { width, left } = this.progressBarOuter.getBoundingClientRect();
        const scrubTo = e.clientX - left; 
        const percent = (scrubTo * 100) / width;
        this.props.audio.currentTime = (this.props.audio.duration / 100) * percent;
    }

    render() {
        return (
            <div className="controls-container">
                <FontAwesomeIcon 
                    icon={faRandom}
                    className={
                        (this.props.isShuffled) ?
                        "icon--green" :
                        ""
                    } 
                    onClick={
                        () => {
                            if (this.props.isShuffled) {
                                this.props.unshuffleCurrentCollection();
                            } else {
                                this.props.shuffleCurrentCollection();
                            }
                        }
                    }
                />

                <FontAwesomeIcon 
                    icon={faStepBackward} 
                    onClick={
                        () => {
                            if (this.props.audio.currentTime <= 3) {
                                this.props.skipToPreviousTrack()
                            } else {
                                this.props.skipToStartOfCurrentTrack();
                                this.props.audio.currentTime = 0;
                                this.props.audio.play();
                            }
                        }
                    }
                />
                <FontAwesomeIcon 
                    icon={(this.props.isPlaying) ? faPauseCircle : faPlayCircle} 
                    onClick={this.props.playPause}
                />
                <FontAwesomeIcon 
                    icon={faStepForward}
                    onClick={this.props.skipToNextTrack} 
                />
                <FontAwesomeIcon 
                    icon={faSyncAlt}
                    className={
                        (this.props.isRepeating) ?
                        "icon--green" :
                        ""
                    } 
                    onClick={this.props.toggleRepeat} 
                />
                <div 
                    className="progress-bar--outer"
                    onClick={this.scrubTrack}
                    ref={el => this.progressBarOuter = el}
                >
                    <div 
                        className="progress-bar--inner"
                        ref={el => this.progressBarInner = el}
                        style={{
                            width: `${this.state.trackProgressPercent}%`
                        }}
                    ></div>
                </div>
            </div>
        );
    }
}

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
    toggleRepeat: PropTypes.func
};

export default PlayerControls;