import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import TrackCollectionItem from './TrackCollectionItem';

class PlaylistView extends Component {

    componentDidMount() {
        if (!this.props.playlists.hasOwnProperty(this.props.playlistID)) {
            this.props.fetchPlaylist(this.props.accessToken, this.props.playlistID, this.props.userID);  
        }
    }

    render() {
        const playlistID = this.props.playlistID;
        if (this.props.playlists.hasOwnProperty(playlistID)) {
            const playlist = this.props.playlists[playlistID];
            return (
                <div className="container">
                    <section className="album">
                        <div className="album__header">
                            <img src={playlist.playlistImage} alt="" className="album__image"></img>
                            <div className="album__info">
                                <h1 className="album__title">{playlist.playlistName}</h1>
                                <p className="album__artist">{`A playlist by ${playlist.ownerName}`}</p>
                            </div>
                        </div>
                        <ul className="album__tracks-list">
                            {
                                playlist.playlistTracks.map(track => {
                                    return (
                                        <TrackCollectionItem 
                                            trackName={track.trackName}
                                            trackID={track.trackID}
                                            key={track.trackID}
                                            albumImage={track.albumImage}
                                            duration={track.duration}
                                            identifier={track.identifier}
                                            previewURL={track.previewURL}
                                            currentlySelectedCollection={this.props.currentlySelectedCollection}
                                            playPauseTrack={() => this.props.playPausePlaylistTrack(track.trackID, track.identifier)}
                                        />
                                    )
                                })
                            }
                        </ul>
                    </section>
                </div>
            );
        } else {
            return null;
        }
    }

}


const mapStateToProps = state => {
    return {
        playlists: state.playlists,
        isFetchingPlaylist: state.isFetchingPlaylist,
        accessToken: state.accessToken,
        currentlySelectedCollection: state.currentlySelectedCollection
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPlaylist(token, playlistID, userID) {
            dispatch(
                ActionCreators.fetchPlaylist(token, playlistID, userID)
            );
        },
        playPausePlaylistTrack(trackID, identifier) {
            dispatch(
                ActionCreators.playPausePlaylistTrack(trackID, identifier)
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistView);