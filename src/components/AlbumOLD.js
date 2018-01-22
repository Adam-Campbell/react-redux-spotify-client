import React from 'react';
import PropTypes from 'prop-types';
import AlbumTrack from './AlbumTrack';


const Album = props => {
    return (
        <section className="album">
            <div className="album__header">
                <img src={props.albumImage} alt="" className="album__image"></img>
                <div className="album__info">
                    <h1 className="album__title">{props.albumName}</h1>
                    <p className="album__artist">{props.artistName}</p>
                    <p className="album__release-date">{props.releaseDate}</p>
                </div>
            </div>
            <ul className="album__tracks-list">

                {
                    props.albumTracks.map(track => {
                        return (
                            <AlbumTrack 
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
                        )
                    })
                }

            </ul>
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
    playPauseTrack: PropTypes.func
}

export default Album;