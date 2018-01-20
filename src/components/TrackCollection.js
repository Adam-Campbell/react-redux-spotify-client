import React from 'react';
import PropTypes from 'prop-types';
import TrackCollectionItem from './TrackCollectionItem';


const TrackCollection = props => {
    return (
        <section className="track-collection">
            <h1 className="track-collection__title">{props.title}</h1>
            <ul className="track-collection__list">
                {
                    props.trackArray.map(track => {
                        return (
                            <TrackCollectionItem 
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


TrackCollection.propTypes = {
    trackArray: PropTypes.array,
    title: PropTypes.string,
    playPauseTrack: PropTypes.func
}

export default TrackCollection;