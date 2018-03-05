import React from 'react';
import PropTypes from 'prop-types';
import TrackWithNumber from '../components/TrackWithNumber';
import { Link } from 'react-router-dom';

const Album = props => (
    <section className="showcase fade-into-view">
        <div className="showcase__header">
            <img src={props.albumImage} alt={`The album cover for ${props.albumName} by ${props.artistName}`} className="showcase__image"></img>
            <div className="showcase__info">
                <h1 className="heading heading--regular">{props.albumName}</h1>
                <Link to={`/artist/${props.artistID}/overview`} className="showcase__link">{props.artistName}</Link>
                <p className="showcase__paragraph">{props.releaseDate}</p>
            </div>
        </div>
        <div className="showcase__tracks-container">
            <ul className="track-collection__list">
                {props.albumTracks.map((track, index) => (
                    <TrackWithNumber 
                        key={index}
                        track={track}
                        currentlySelectedCollection={props.currentlySelectedCollection}
                        playPauseTrack={() => props.playPauseTrack(track.trackID, track.identifier)}
                    />
                ))}
            </ul>
        </div>
    </section>
);

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