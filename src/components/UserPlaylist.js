import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import PlaylistTracks from './PlaylistTracks';
import Paginator from './Paginator';
import UserPlaylistName from './UserPlaylistName';
import Portal from './Portal';
import ImageUploadModal from './ImageUploadModal';
//
//  Needs to render essentially the same view that the regular Playlist component does, 
//  but with extra functionality.
//
//  It needs an option to upload a new image that replaces the old one. When used it will replace
//  the old image in the store which will in turn cause the UserPlaylist component to rerender with
//  the new image. It will also dispatch an action that triggers the API call to make Spotify update
//  the image on their end. 
//
//  The playlist name needs to be editable - when you click it it turns into an input where you
//  can change the name. You are then able to save it, which turns the element back into an H1, 
//  updates the store with the new name of the playlist and triggers the API call to update it on
//  Spotifys end.
//
//  Each track that is rendered will need two options, represented by icons in the UI -- add track
//  to playlist, and remove track from playlist. Add track to playlist will be a common functionality
//  shared by all tracks, but remove track from playlist will only be available on the playlists rendered
//  via the UserPlaylist component, as these are the only ones the user owns. 
//
//
//
//
//
//


class UserPlaylist extends Component {

    constructor(props) {
        super(props);
        this.setPage = this.setPage.bind(this);
        this.editName = this.editName.bind(this);
        this.saveName = this.saveName.bind(this);
        this.updateLocalName = this.updateLocalName.bind(this);
        this.toggleImageUploadModal = this.toggleImageUploadModal.bind(this);
        this.state = {
            currentPage: 1,
            isEditingName: false,
            localName: this.props.playlistName,
            isShowingImageUploadModal: false,
        };  
    }

    setPage(e, num) {
        e.preventDefault();
        this.setState({currentPage: parseInt(num)});
    }

    editName() {
        this.setState({isEditingName: true});
    }

    saveName(e) {
        this.setState({isEditingName: false});
        //console.log(this.state.localName);
        this.props.updatePlaylistName(this.props.ownerID, this.props.playlistID, this.state.localName, this.props.accessToken)
    }

    updateLocalName(e) {
        this.setState({localName: e.target.value});
    }

    toggleImageUploadModal() {
        this.setState({isShowingImageUploadModal: !this.state.isShowingImageUploadModal});
    }

    render() {
        return (
            <div>
            <section className="album">
                <div className="album__header">
                    <div className="album__image-section-container">
                        <img src={this.props.playlistImage} alt="" className="album__image"></img>
                        <button 
                            className="album__image-upload-button"
                            onClick={this.toggleImageUploadModal}
                        >
                            Upload Image
                        </button>
                    </div>
                    <div className="album__info">
                        <UserPlaylistName 
                            editName={this.editName}
                            saveName={this.saveName}
                            updateLocalName={this.updateLocalName}
                            isEditingName={this.state.isEditingName}
                            localName={this.state.localName}
                            playlistName={this.props.playlistName}
                        />
                        <p className="album__paragraph">{this.props.ownerName}</p>
                    </div>
                </div>
                <PlaylistTracks 
                    playlistTracks={this.props.playlistTracks}
                    currentlySelectedCollection={this.props.currentlySelectedCollection}
                    playPauseTrack={this.props.playPauseTrack}
                    currentPage={this.state.currentPage}
                    playlistID={this.props.playlistID}
                    ownerID={this.props.ownerID}
                    userID={this.props.userID}
                    accessToken={this.props.accessToken}
                />
            </section>
            <Paginator 
                totalItems={this.props.playlistTracks.length}
                itemsPerPage={50}
                currentPage={this.state.currentPage}
                setPage={this.setPage}
            />
            <Portal>
                <ImageUploadModal 
                    isShowingImageUploadModal={this.state.isShowingImageUploadModal}
                    toggleImageUploadModal={this.toggleImageUploadModal}
                    playlistID={this.props.playlistID}
                    ownerID={this.props.ownerID}
                    accessToken={this.props.accessToken}
                />
            </Portal>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        userID: state.userInfo.userID
    }
}


const mapDispatchToProps = dispatch => {
    return {
        updatePlaylistName(ownerID, playlistID, newName, token) {
            dispatch(
                ActionCreators.updatePlaylistName(ownerID, playlistID, newName, token)
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPlaylist); 
