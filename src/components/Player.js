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
        this.toggleFullScreen = this.toggleFullScreen.bind(this);
        this.state = {
            isFullScreen: false
        };
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

    // This function is simply responsible for toggling the player between being full screen
    // and being minimized.
    toggleFullScreen() {
        this.setState({isFullScreen: !this.state.isFullScreen});
    }
    
    render() {
        const collection = this.props.currentlySelectedCollection.collection;
        const selectedTrack = collection[collection.findIndex(track => track.isCurrentlySelected)] || false;
        
        return (
            <section className={`player-controls ${collection.length ? 'show-player' : ''} ${this.state.isFullScreen ? 'full-screen-player' : ''}`}>
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
                    />

                    <PlayerVolumeControls 
                        audio={this.audio}
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
        toggleRepeat: ActionCreators.toggleRepeat
    }
)(Player);