import React from 'react';
import PropTypes from 'prop-types';
import TrackWithNumber from './TrackWithNumber';

const ArtistAlbum = props => {
    const albumID = props.albumID; // passed in via URL 
    const albumIndex = props.artistInfo.albums.findIndex(album => album.albumID === albumID);
    const album = props.artistInfo.albums[albumIndex];

    return (
        <section className="album">
            <div className="album__header">
                <img src="https://i.scdn.co/image/d8296568ae1b856050976111fa892d8db693efd5" alt="" className="album__image"></img>
                <div className="album__info">
                    <h1 className="heading heading--regular">{album.albumName}</h1>
                    <p className="album__paragraph">{album.artistName}</p>
                    <p className="album__paragraph">{album.releaseDate}</p>
                </div>
                <div className="album__tracks-container">
                    <ul className="track-collection__list">
                        {
                            album.albumTracks.map(track => {
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
            </div>
        </section>
    );
}


SingularAlbum.propTypes = {
    albumID: PropTypes.string,
    artistInfo: PropTypes.object,
    accessToken: PropTypes.string,
    playPauseTrack: PropTypes.func
}


export default SingularAlbum;

