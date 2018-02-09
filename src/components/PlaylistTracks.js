import React from 'react';
import PropTypes from 'prop-types';
import TrackWithImage from './TrackWithImage';

const PlaylistTracks = props => {
    const upperBound = props.currentPage * 50;
    const lowerBound = upperBound - 50;
    return (
        <div className="album__tracks-container">
            <ul className="track-collection__list">
                {
                    props.playlistTracks.slice(lowerBound, upperBound).map(track => {
                        return (
                            <TrackWithImage 
                            trackName={track.trackName}
                            trackID={track.trackID}
                            key={track.trackID}
                            duration={track.duration}
                            trackNumber={track.trackNumber}
                            albumImage={track.albumImage}
                            previewURL={track.previewURL}
                            identifier={track.identifier}
                            currentlySelectedCollection={props.currentlySelectedCollection}
                            playPauseTrack={() => props.playPauseTrack(track.trackID, track.identifier)}
                            /> 
                        );
                    })
                }
            </ul>
        </div>  
    );
};

PlaylistTracks.propTypes = {
    playlistTracks: PropTypes.array,
    currentlySelectedCollection: PropTypes.object,
    playPauseTrack: PropTypes.func,
    page: PropTypes.number
}

export default PlaylistTracks;