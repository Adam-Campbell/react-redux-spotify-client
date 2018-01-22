import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import Album from './Album';



class OrphanAlbumView extends Component {


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
                <Album 
                    albumName={album.albumName}
                    albumID={album.albumID}
                    artistName={album.artistName}
                    releaseDate={album.releaseDate}
                    albumImage={album.albumImage}
                    albumTracks={album.albumTracks}
                    playPauseTrack={this.props.playPauseOrphanAlbumTrack}
                    currentlySelectedCollection={this.props.currentlySelectedCollection}
                />
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


export default connect(mapStateToProps, mapDispatchToProps)(OrphanAlbumView);

