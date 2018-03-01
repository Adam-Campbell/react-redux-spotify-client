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

    // When the user interacts with the scrub bar this function works out which point in the song
    // the users 'scrub' action maps to, and moves the song to that point. It doesn't update the 
    // scrub bar itself, because this is updated via a setInterval initialized in componentDidMount.
    scrubTrack(e) {
        const audio = document.getElementById('audioElem');
        const { width, left } = document.querySelector('.progress-bar--outer').getBoundingClientRect();
        const scrubTo = e.clientX - left; 
        const percent = (scrubTo * 100) / width;
        audio.currentTime = (audio.duration / 100) * percent;
    }

    // This function sets the volume of the track when the user interacts with the volume bar. It is
    // responsible for the updating of both the track volume as well as the volume bar itself.
    changeVolume(e) {
        const audio = document.getElementById('audioElem');
        const volumeControl = document.querySelector('.volume-control--inner');
        const { height, top } = document.querySelector('.volume-control--outer').getBoundingClientRect();
        const posFromBottom = height - (e.clientY - top);
        const percent = (posFromBottom * 100) / height;
        const decimal = percent / 100;
        volumeControl.style.height = `${percent}%`;
        audio.volume = decimal;
    }

    // This function initializes the setInterval that ensures that the progress bar stays in sync
    // with the track progress.
    componentDidMount() {
        const au = document.getElementById('audioElem');
        const progBarInner = document.querySelector('.progress-bar--inner');
        setInterval(() => {
            progBarInner.style.width =`${(au.currentTime * 100) / au.duration}%`;
        }, 50);
    }

    // This function works out which of the tracks from the currentlySelectedCollection is 
    // currently selected. Then it looks to see if that track is currently playing according
    // to the app state. If it is then the function calls the play method on the audio element,
    // but if not then it calls the pause method.
    componentDidUpdate() {
        const collection = this.props.currentlySelectedCollection.collection;
        const selectedTrack = collection[collection.findIndex(track => track.isCurrentlySelected)] || false;
        const au = document.getElementById('audioElem');
        if (selectedTrack.isPlaying) {
            au.play();
        } else {
            au.pause();
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
        const au = document.getElementById('audioElem');
        if (oldKey !== newKey && au.src) {
            au.currentTime = 0;
        }
    }

    // This function is simply responsible for toggling the player between being full screen
    // and being minimized.
    toggleFullScreen() {
        const player = document.querySelector('.player-controls');
        player.classList.toggle('full-screen-player');
    }

    render() {
        const au = document.getElementById('audioElem');
        const collection = this.props.currentlySelectedCollection.collection;
        const selectedTrack = collection[collection.findIndex(track => track.isCurrentlySelected)] || false;
        
        return (
            <section className={(collection.length) ? "player-controls show-player" : "player-controls"}>
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
                        scrubTrack={this.scrubTrack}
                        toggleRepeat={this.props.toggleRepeat}
                        audioElement={au}
                    />

                    <PlayerVolumeControls 
                        changeVolume={this.changeVolume}
                    />

                    <PlayerAudioElement 
                        previewURL={selectedTrack.previewURL}
                        isRepeating={this.props.currentlySelectedCollection.isRepeating}
                        audioElement={au}
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
        toggleRepeat: ActionCreators.toggleRepeat
    }
)(Player);