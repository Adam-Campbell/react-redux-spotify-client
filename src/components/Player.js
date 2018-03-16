import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCaretUp from '@fortawesome/fontawesome-free-solid/faCaretUp';
import PlayerTrackInfo from './PlayerTrackInfo';
import PlayerControls from './PlayerControls';
import PlayerVolumeControls from './PlayerVolumeControls';
import PlayerAudioElement from './PlayerAudioElement';


class Player extends Component {


    constructor(props) {
        super(props);
        this.changeVolume = this.changeVolume.bind(this);
        this.updateTrackScrubber = this.updateTrackScrubber.bind(this);
        this.setNewTrackTime = this.setNewTrackTime.bind(this);
        this.makeVolumeControlActive = this.makeVolumeControlActive.bind(this);
        this.makeVolumeControlInactive = this.makeVolumeControlInactive.bind(this);
        this.makeTrackControlActive = this.makeTrackControlActive.bind(this);
        this.makeTrackControlInactive = this.makeTrackControlInactive.bind(this);
        this.toggleFullScreen = this.toggleFullScreen.bind(this);
        this.handleMousemove = this.handleMousemove.bind(this);
        this.handleMouseleave = this.handleMouseleave.bind(this);
        this.handleMouseup = this.handleMouseup.bind(this);
        this.state = {
            isFullScreen: false,
            volumeControlActive: false,
            volume: 100,
            trackControlActive: false,
            trackProgressPercent: 0
        };
    }

    componentDidMount() {
        setInterval(() => {
            if (this.audio && !this.state.trackControlActive) {
                this.setState({
                    trackProgressPercent: (this.audio.currentTime * 100) / this.audio.duration
                });
            }
        }, 50);
    }

    // This function works out which of the tracks from the currentlySelectedCollection is 
    // currently selected. Then it looks to see if that track is currently playing according
    // to the app state. If it is then the function calls the play method on the audio element,
    // but if not then it calls the pause method.
    componentDidUpdate() {
        const collection = this.props.currentlySelectedCollection.collection;
        const selectedTrack = collection[collection.findIndex(track => track.isCurrentlySelected)] || false;
        if (selectedTrack.isPlaying) {
            this.audio.play();
        } else {
            this.audio.pause();
        }
    }

    // This function prevents a situation where the audio element doesn't update the way it  
    // should if you are switching from a song to the same song (same src) but as part of a    
    // different collection. In this situation when you click play on the new track the desired
    // response is that the audio element skips back to the start of the track and plays on from
    // there. This doesn't happen when the new and old tracks have the same src because the DOM 
    // doesn't recognize this as updating the src at all. So this function essentially forces the 
    // track to restart in those situations.
    componentWillReceiveProps(nextProps) {
        const oldKey = this.props.currentlySelectedCollection.collectionKey;
        const newKey = nextProps.currentlySelectedCollection.collectionKey;
        if (oldKey !== newKey && this.audio.src) {
            this.audio.currentTime = 0;
        }
    }

    changeVolume(pos) {
        if (this.state.volumeControlActive) {
            const { top, bottom, height } = this.volumeControlOuter.getBoundingClientRect();
            if (pos <= top) {
                this.setState({ volume: 100 });
                this.audio.volume = 1;
            } else if (pos >= bottom) {
                this.setState({volume: 0});
                this.audio.volume = 0;
            } else {
                const posFromBottom = height - (pos - top);
                const percentFromBottom = (posFromBottom * 100) / height;
                this.setState({ volume: percentFromBottom});
                this.audio.volume = percentFromBottom / 100;
            }
        }
    }

    updateTrackScrubber(pos) {
        if (this.state.trackControlActive) {
            const { left, right, width } = this.progressBarOuter.getBoundingClientRect(); 
            if (pos <= left) {
                this.setState({ trackProgressPercent: 0 });
            } else if (pos >= right) {
                this.setState({ trackProgressPercent: 99.99 });
            } else {
                const posFromLeft = pos - left;
                const percentFromLeft = (posFromLeft * 100) / width;
                this.setState({ trackProgressPercent: percentFromLeft });
            }
        }
    }

    setNewTrackTime() {
        if (this.state.trackControlActive) {
            this.audio.currentTime = (this.audio.duration / 100) * this.state.trackProgressPercent;
            this.setState({ trackControlActive: false });
        }
    }


    makeVolumeControlActive() {
        this.setState({ volumeControlActive: true });
    }

    makeVolumeControlInactive() {
        this.setState({ volumeControlActive: false });
    }

    makeTrackControlActive() {
        this.setState({ trackControlActive: true });
    }

    makeTrackControlInactive() {
        this.setState({ trackControlActive: false });
    }

    handleMousemove(e) {
        this.changeVolume(e.clientY);
        this.updateTrackScrubber(e.clientX);
    }

    handleMouseleave(e) {
        this.setState({ volumeControlActive: false });
        this.setState({ trackControlActive: false });
    }

    handleMouseup(e) {
        this.setState({ volumeControlActive: false });
        this.setNewTrackTime();
    }


    // This function is simply responsible for toggling the player between being full screen
    // and being minimized.
    toggleFullScreen() {
        this.setState({isFullScreen: !this.state.isFullScreen});
    }
    
    render() {
        const collection = this.props.currentlySelectedCollection.collection;
        const selectedTrack = collection[collection.findIndex(track => track.isCurrentlySelected)] || false;
        
        return (
            <section 
                className={`player-controls ${collection.length ? 'show-player' : ''} ${this.state.isFullScreen ? 'full-screen-player' : ''}`}
                onMouseMove={this.handleMousemove}
                onMouseLeave={this.handleMouseleave}
                onMouseUp={this.handleMouseup}
            >
                <div className="player-controls__inner-wrapper">

                    <FontAwesomeIcon 
                        icon={faCaretUp}
                        onClick={this.toggleFullScreen} 
                    />                

                    <PlayerTrackInfo 
                        albumImage={selectedTrack ? selectedTrack.albumImage[0].url : ''}
                        trackName={selectedTrack.trackName}
                        artistName={selectedTrack.artistName}
                    />

                    <PlayerControls 
                        isShuffled={this.props.currentlySelectedCollection.isShuffled}
                        isRepeating={this.props.currentlySelectedCollection.isRepeating}
                        isPlaying={selectedTrack.isPlaying}
                        shuffleCurrentCollection={this.props.shuffleCurrentCollection}
                        unshuffleCurrentCollection={this.props.unshuffleCurrentCollection}
                        skipToPreviousTrack={this.props.skipToPreviousTrack}
                        skipToNextTrack={this.props.skipToNextTrack}
                        playPause={() => this.props.playPauseFromPlayer(selectedTrack.trackID)}
                        toggleRepeat={this.props.toggleRepeat}
                        audio={this.audio}
                        skipToStartOfCurrentTrack={this.props.skipToStartOfCurrentTrack}
                        trackProgressPercent={this.state.trackProgressPercent}
                        makeTrackControlActive={this.makeTrackControlActive}
                        makeTrackControlInactive={this.makeTrackControlInactive}
                        updateTrackScrubber={this.updateTrackScrubber}
                        progressBarOuterRef={el => this.progressBarOuter = el}
                        setNewTrackTime={this.setNewTrackTime}
                    />

                    <PlayerVolumeControls 
                        audio={this.audio}
                        volumeControlOuterRef={el => this.volumeControlOuter = el}
                        volume={this.state.volume}
                        makeVolumeControlActive={this.makeVolumeControlActive}
                        makeVolumeControlInactive={this.makeVolumeControlInactive}
                        changeVolume={this.changeVolume}
                    />

                    <PlayerAudioElement 
                        audioElementRef={el => this.audio = el}
                        previewURL={selectedTrack.previewURL}
                        isRepeating={this.props.currentlySelectedCollection.isRepeating}
                        audio={this.audio}
                        skipToNextTrack={this.props.skipToNextTrack}
                    />

                </div>
            </section> 
        );
    }
}

const mapStateToProps = state => ({
    artistInfo: state.artistInfo,
    currentlySelectedCollection: state.currentlySelectedCollection
});

export default connect(
    mapStateToProps, 
    {
        playPauseFromPlayer: ActionCreators.playPauseFromPlayer,
        skipToNextTrack: ActionCreators.skipToNextTrack,
        skipToPreviousTrack: ActionCreators.skipToPreviousTrack,
        shuffleCurrentCollection: ActionCreators.shuffleCurrentCollection,
        unshuffleCurrentCollection: ActionCreators.unshuffleCurrentCollection,
        toggleRepeat: ActionCreators.toggleRepeat,
        skipToStartOfCurrentTrack: ActionCreators.skipToStartOfCurrentTrack
    }
)(Player);