import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlayCircle from '@fortawesome/fontawesome-free-solid/faPlayCircle';
import faPauseCircle from '@fortawesome/fontawesome-free-solid/faPauseCircle';
import faStepBackward from '@fortawesome/fontawesome-free-solid/faStepBackward';
import faStepForward from '@fortawesome/fontawesome-free-solid/faStepForward';
import faRandom from '@fortawesome/fontawesome-free-solid/faRandom';
import faSyncAlt from '@fortawesome/fontawesome-free-solid/faSyncAlt';
import faCaretUp from '@fortawesome/fontawesome-free-solid/faCaretUp';


class PlayerControls extends Component {

    constructor() {
        super();
        this.findSelectedTrack = this.findSelectedTrack.bind(this);
    }

    findSelectedTrack() {
        let selectedTrack;
        if(!this.props.artistInfo.artistID) return false;
        this.props.artistInfo.topTracks.forEach(track => {
            if (track.isCurrentlySelected) {
                selectedTrack = track;
            }
        });
        if (selectedTrack) return selectedTrack;
        this.props.artistInfo.albums.forEach(album => {
            album.albumTracks.forEach(track => {
                if (track.isCurrentlySelected) {
                    selectedTrack = track;
                }
            });
        });
        if (selectedTrack) {
            return selectedTrack;
        } else {
            return false;
        }
        
    }

    scrubTrack(e) {
        const audio = document.getElementById('audioElem');
        const { width, left } = document.querySelector('.progress-bar--outer').getBoundingClientRect();
        const scrubTo = e.clientX - left; 
        const percent = (scrubTo * 100) / width;
        audio.currentTime = (audio.duration / 100) * percent;
    }

    changeVolume(e) {
        //
        //  - Work out position of event as a percentage of volume-control--outer height
        //  - Set track volume to corresponding decimal
        //  - Set volum-control--inner height to the percentage
        const audio = document.getElementById('audioElem');
        const volumeControl = document.querySelector('.volume-control--inner');
        const { height, top } = document.querySelector('.volume-control--outer').getBoundingClientRect();
        const posFromBottom = height - (e.clientY - top);
        const percent = (posFromBottom * 100) / height;
        const decimal = percent / 100;
        volumeControl.style.height = `${percent}%`;
        audio.volume = decimal;
    }

    componentDidUpdate() {
        const collection = this.props.currentlySelectedCollection.collection;
        const selectedTrack = collection[collection.findIndex(track => track.isCurrentlySelected)] || false;
        let au = document.getElementById('audioElem');
        let progBarInner = document.querySelector('.progress-bar--inner');
        if (selectedTrack.isPlaying) {
            au.play();
        } else {
            au.pause();
        }
        setInterval(() => {
            progBarInner.style.width =`${(au.currentTime * 100) / au.duration}%`;
        }, 50);
        
    }

    componentWillReceiveProps(nextProps) {
        const oldKey = this.props.currentlySelectedCollection.collectionKey;
        const newKey = nextProps.currentlySelectedCollection.collectionKey;
        const au = document.getElementById('audioElem');
        if (oldKey !== newKey && au.src) {
            au.currentTime = 0;
        }
    }

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

                <div className="track-info">
                    <img className="track-info__image" src={selectedTrack.albumImage}></img>
                    <div className="track-info__text-container">
                        <p className="track-info__track-name">{selectedTrack.trackName}</p>
                        <p className="track-info__artist-name">{selectedTrack.artistName}</p>
                    </div>
                </div>

                <div className="controls-container">

                    <FontAwesomeIcon 
                        icon={faRandom}
                        className={
                            (this.props.currentlySelectedCollection.isShuffled) ?
                            "icon--green" :
                            ""
                        } 
                        onClick={
                            () => {
                                if (this.props.currentlySelectedCollection.isShuffled) {
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
                                if (au.currentTime <= 3) {
                                    this.props.skipToPreviousTrack()
                                } else {
                                    au.currentTime = 0;
                                    au.play();
                                }
                            }
                        }
                    />
                    <FontAwesomeIcon 
                        icon={(selectedTrack.isPlaying) ? faPauseCircle : faPlayCircle} 
                        onClick={() => this.props.playPauseFromPlayer(selectedTrack.trackID)}
                    />
                    <FontAwesomeIcon 
                        icon={faStepForward}
                        onClick={this.props.skipToNextTrack} 
                    />
                    <FontAwesomeIcon 
                        icon={faSyncAlt}
                        className={
                            (this.props.currentlySelectedCollection.isRepeating) ?
                            "icon--green" :
                            ""
                        } 
                        onClick={this.props.toggleRepeat} 
                    />
                    <div 
                        className="progress-bar--outer"
                        onClick={this.scrubTrack}
                    >
                        <div className="progress-bar--inner"></div>
                    </div>
                </div>
                <div 
                    className="volume-control--outer"
                    onClick={this.changeVolume}
                >
                        <div className="volume-control--inner"></div>
                </div>
                <audio 
                    id="audioElem" 
                    src={selectedTrack.previewURL}
                    onEnded={
                        () => {
                            if (this.props.currentlySelectedCollection.isRepeating) {
                                au.currentTime = 0;
                                au.play();
                            } else {
                                this.props.skipToNextTrack();
                            }  
                        }
                    }
                >
                </audio>
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
)(PlayerControls);