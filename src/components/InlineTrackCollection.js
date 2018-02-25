import React from 'react';
import PropTypes from 'prop-types';
import TrackWithImage from './TrackWithImage';

const InlineTrackCollection = props => (
    <section className="track-collection">
        <h1 className="heading heading--regular">{props.title}</h1>
        <ul className="track-collection__list">
            {props.trackArray.map((track, index) => (
                        <TrackWithImage 
                            key={index}
                            track={track}
                            playPauseTrack={() => props.playPauseTrack(track.trackID, track.identifier)}
                            currentlySelectedCollection={props.currentlySelectedCollection}
                        />
            ))}
        </ul>
    </section>
);

InlineTrackCollection.propTypes = {
    trackArray: PropTypes.array,
    title: PropTypes.string,
    playPauseTrack: PropTypes.func
};

export default InlineTrackCollection;