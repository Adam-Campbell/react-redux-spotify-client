import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import Album from './Album';
import Loader from './Loader';
import FadeInContainer from './FadeInContainer';

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
                <FadeInContainer>
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
                </FadeInContainer>
            );
        } else if (this.props.orphanAlbums.isFetching) {
            return <Loader />;  
        }
        return null;
    }
}

const mapStateToProps = state => ({
    orphanAlbums: state.orphanAlbums,
    accessToken: state.accessToken.token,
    currentlySelectedCollection: state.currentlySelectedCollection
});

export default connect(
    mapStateToProps, 
    {
        fetchOrphanAlbum: ActionCreators.fetchOrphanAlbum,
        playPauseOrphanAlbumTrack: ActionCreators.playPauseOrphanAlbumTrack
    }
)(OrphanAlbumView);

