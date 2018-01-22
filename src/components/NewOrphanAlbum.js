import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import TrackWithNumber from './TrackWithNumber';



class NewOrphanAlbum extends Component {


    componentDidMount() {
        if (!this.props.orphanAlbums.hasOwnProperty(this.props.albumID)) {
            this.props.fetchOrphanAlbum(this.props.accessToken, this.props.albumID);  
        }
    }

    render() {
        const albumID = this.props.albumID;
        if (this.props.orphanAlbums.hasOwnProperty(albumID)) {
            const album = this.props.orphanAlbums[albumID];
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
                                            playPauseTrack={() => props.playPauseOrphanAlbumTrack(track.trackID, track.identifier)}
                                           /> 
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </section>
            );
        } else if (this.props.isFetchingOrphanAlbum) {
            return (
                <p>Currently fetching album!</p>
            )
        }
        else {
            return null;
        }
    }
}

const mapStateToProps = state => {
    return {
        orphanAlbums: state.orphanAlbums,
        isFetchingOrphanAlbum: state.isFetchingOrphanAlbum,
        accessToken: state.accessToken,
        currentlySelectedCollection: state.currentlySelectedCollection
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrphanAlbum(token, id) {
            dispatch(
                ActionCreators.fetchOrphanAlbum(token, id)
            );
        },
        playPauseOrphanAlbumTrack(trackID, identifier) {
            dispatch(
                ActionCreators.playPauseOrphanAlbumTrack(trackID, identifier)
            );
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewOrphanAlbum);

