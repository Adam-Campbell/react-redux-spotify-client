import React from 'react';
import PropTypes from 'prop-types';
import TrackWithImage from './TrackWithImage';
import RemoveTrackButton from './RemoveTrackButton'

const PlaylistTracks = props => {
    const upperBound = props.currentPage * 50;
    const lowerBound = upperBound - 50;
    return (
        <div className="album__tracks-container">
            <ul className="track-collection__list">
                {props.playlistTracks.slice(lowerBound, upperBound).map((track, index) => (
                    <TrackWithImage 
                        key={index}
                        track={track}
                        currentlySelectedCollection={props.currentlySelectedCollection}
                        playPauseTrack={() => props.playPauseTrack(track.trackID, track.identifier)}
                    >
                        <RemoveTrackButton 
                            index={lowerBound + index}
                            trackURI={track.trackURI}
                            trackName={track.trackName}
                            playlistID={props.playlistID}
                            ownerID={props.ownerID}
                            userID={props.userID}
                            accessToken={props.accessToken}
                        />
                    </TrackWithImage>
                ))}
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