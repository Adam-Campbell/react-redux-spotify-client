import React from 'react';
import PropTypes from 'prop-types';
import TrackWithNumber from './TrackWithNumber';


const Album = props => {
    return (
        <section className="album">
            <div className="album__header">
                <img src={props.albumImage} alt="" className="album__image"></img>
                <div className="album__info">
                    <h1 className="heading heading--regular">{props.albumName}</h1>
                    <p className="album__paragraph">{props.artistName}</p>
                    <p className="album__paragraph">{props.releaseDate}</p>
                </div>
            </div>
            <div className="album__tracks-container">
                <ul className="track-collection__list">
                    {
                        props.albumTracks.map(track => {
                            return (
                                <TrackWithNumber 
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


Album.propTypes = {
    albumName: PropTypes.string,
    artistName: PropTypes.string,
    albumID: PropTypes.string,
    releaseDate: PropTypes.string,
    albumImage: PropTypes.string,
    albumTracks: PropTypes.array,
    playPauseTrack: PropTypes.func,
    currentlySelectedCollection: PropTypes.object
}

export default Album;