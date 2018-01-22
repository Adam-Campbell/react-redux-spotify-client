import React from 'react';
import PropTypes from 'prop-types';
import TrackWithImage from './TrackWithImage';


const InlineTrackCollection = props => {
    return (
        <section className="track-collection">
            <h1 className="heading heading--regular">{props.title}</h1>
            <ul className="track-collection__list">
                {
                    props.trackArray.map(track => {
                        return (
                            <TrackWithImage 
                                trackName={track.trackName}
                                trackID={track.trackID}
                                key={track.trackID}
                                albumImage={track.albumImage}
                                duration={track.duration}
                                previewURL={track.previewURL}
                                identifier={track.identifier}
                                playPauseTrack={() => props.playPauseTrack(track.trackID, track.identifier)}
                                currentlySelectedCollection={props.currentlySelectedCollection}
                            />
                        )
                    })
                }
            </ul>
        </section>
    )
}


InlineTrackCollection.propTypes = {
    trackArray: PropTypes.array,
    title: PropTypes.string,
    playPauseTrack: PropTypes.func
}

export default InlineTrackCollection;