import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import PlaylistTracks from './PlaylistTracks';
import Paginator from './Paginator';
import UserPlaylistName from './UserPlaylistName';
import Portal from './Portal';
import ImageUploadModal from './ImageUploadModal';

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
                                onClick={() => this.props.imageUploadModalOpen({playlistID: this.props.playlistID})}
                            >Upload Image</button>
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
                            <p className="album__paragraph">A playlist by {this.props.ownerName}</p>
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
            </div>
        );
    }

}

const mapStateToProps = state => ({
    userID: state.userInfo.userID
});

export default connect(
    mapStateToProps, 
    {
        updatePlaylistName: ActionCreators.updatePlaylistName,
        imageUploadModalOpen: ActionCreators.imageUploadModalOpen
    }
)(UserPlaylist); 
