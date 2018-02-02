import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import Album from './Album';
import Loader from './Loader';



class OrphanAlbumView extends Component {


    componentDidMount() {
        if (!this.props.orphanAlbums.albumData.hasOwnProperty(this.props.albumID)) {
            this.props.fetchOrphanAlbum(this.props.accessToken, this.props.albumID);  
        }
    }

    render() {
        const albumID = this.props.albumID;
        if (this.props.orphanAlbums.albumData.hasOwnProperty(albumID)) {
            const album = this.props.orphanAlbums.albumData[albumID];
            return (
                <Album 
                    albumName={album.albumName}
                    albumID={album.albumID}
                    artistName={album.artistName}
                    artistID={album.artistID}
                    releaseDate={album.releaseDate}
                    albumImage={album.albumImage}
                    albumTracks={album.albumTracks}
                    playPauseTrack={this.props.playPauseOrphanAlbumTrack}
                    currentlySelectedCollection={this.props.currentlySelectedCollection}
                />
            );
        } else if (this.props.orphanAlbums.isFetching) {
            return (
                <Loader />
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

