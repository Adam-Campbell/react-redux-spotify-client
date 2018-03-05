import React from 'react';
import PropTypes from 'prop-types';
import PlaylistTracks from './PlaylistTracks';
import Paginator from './Paginator';
import withPagination from './withPagination';

const Playlist = props => (
    <div className="fade-into-view">
        <section className="showcase">
            <div className="showcase__header">
                <img src={props.playlistImage} alt="" className="showcase__image"></img>
                <div className="showcase__info">
                    <h1 className="heading heading--regular">{props.playlistName}</h1>
                    <p className="showcase__paragraph">A playlist by {props.ownerName}</p>
                </div>
            </div>
            <PlaylistTracks 
                playlistTracks={props.playlistTracks}
                currentlySelectedCollection={props.currentlySelectedCollection}
                playPauseTrack={props.playPauseTrack}
                currentPage={props.currentPage}
                ownerID={props.ownerID}
                userID={props.userID}
                accessToken={props.accessToken}
            />
        </section>
        <Paginator 
            totalItems={props.playlistTracks.length}
            itemsPerPage={50}
            currentPage={props.currentPage}
            setPage={props.setPage}
        />
    </div>
);


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

export default withPagination(Playlist);
