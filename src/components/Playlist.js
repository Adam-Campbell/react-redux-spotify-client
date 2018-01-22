import React from 'react';
import PropTypes from 'prop-types';
import TrackWithImage from './TrackWithImage';


const Playlist = props => {
    return (
        <section className="album">
            <div className="album__header">
                <img src={props.playlistImage} alt="" className="album__image"></img>
                <div className="album__info">
                    <h1 className="heading heading--regular">{props.playlistName}</h1>
                    <p className="album__paragraph">{props.ownerName}</p>
                </div>
            </div>
            <div className="album__tracks-container">
                <ul className="track-collection__list">
                    {
                        props.playlistTracks.map(track => {
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
        </section>
    );
}


Playlist.propTypes = {
    playlistName: PropTypes.string,
    playlistID: PropTypes.string,
    playlistImage: PropTypes.string,
    ownerID: PropTypes.string,
    ownerName: PropTypes.string,
    playlistTracks: PropTypes.array,
    playPauseTrack: PropTypes.func,
    currentlySelectedCollection: PropTypes.object
}

export default Playlist;