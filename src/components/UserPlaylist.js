import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import PlaylistTracks from './PlaylistTracks';
import Paginator from './Paginator';
import UserPlaylistName from './UserPlaylistName';
import Portal from './Portal';
import ImageUploadModal from './ImageUploadModal';
import withFadeIn from './withFadeIn';
import withPagination from './withPagination';


class UserPlaylist extends Component {

    constructor(props) {
        super(props);
        this.editName = this.editName.bind(this);
        this.saveName = this.saveName.bind(this);
        this.updateLocalName = this.updateLocalName.bind(this);
        this.toggleImageUploadModal = this.toggleImageUploadModal.bind(this);
        this.state = {
            isEditingName: false,
            localName: this.props.playlistName,
            isShowingImageUploadModal: false,
        };  
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
            <div className="fade-into-view">
                <section className="showcase">
                    <div className="showcase__header">
                        <div className="showcase__image-section-container">
                            <img src={this.props.playlistImage} alt="" className="showcase__image"></img>
                            <button 
                                className="button button--push-down"
                                onClick={() => this.props.imageUploadModalOpen({playlistID: this.props.playlistID})}
                            >Upload Image</button>
                        </div>
                        <div className="showcase__info">
                            <UserPlaylistName 
                                editName={this.editName}
                                saveName={this.saveName}
                                updateLocalName={this.updateLocalName}
                                isEditingName={this.state.isEditingName}
                                localName={this.state.localName}
                                playlistName={this.props.playlistName}
                            />
                            <p className="showcase__paragraph">A playlist by {this.props.ownerName}</p>
                        </div>
                    </div>
                    <PlaylistTracks 
                        playlistTracks={this.props.playlistTracks}
                        currentlySelectedCollection={this.props.currentlySelectedCollection}
                        playPauseTrack={this.props.playPauseTrack}
                        currentPage={this.props.currentPage}
                        playlistID={this.props.playlistID}
                        ownerID={this.props.ownerID}
                        userID={this.props.userID}
                        accessToken={this.props.accessToken}
                    />
                </section>
                <Paginator 
                    totalItems={this.props.playlistTracks.length}
                    itemsPerPage={50}
                    currentPage={this.props.currentPage}
                    setPage={this.props.setPage}
                />
            </div>
        );
    }

}











// class UserPlaylist extends Component {

//     constructor(props) {
//         super(props);
//         this.setPage = this.setPage.bind(this);
//         this.editName = this.editName.bind(this);
//         this.saveName = this.saveName.bind(this);
//         this.updateLocalName = this.updateLocalName.bind(this);
//         this.toggleImageUploadModal = this.toggleImageUploadModal.bind(this);
//         this.state = {
//             currentPage: 1,
//             isEditingName: false,
//             localName: this.props.playlistName,
//             isShowingImageUploadModal: false,
//         };  
//     }

//     setPage(e, num) {
//         e.preventDefault();
//         this.setState({currentPage: parseInt(num)});
//     }

//     editName() {
//         this.setState({isEditingName: true});
//     }

//     saveName(e) {
//         this.setState({isEditingName: false});
//         //console.log(this.state.localName);
//         this.props.updatePlaylistName(this.props.ownerID, this.props.playlistID, this.state.localName, this.props.accessToken)
//     }

//     updateLocalName(e) {
//         this.setState({localName: e.target.value});
//     }

//     toggleImageUploadModal() {
//         this.setState({isShowingImageUploadModal: !this.state.isShowingImageUploadModal});
//     }

//     render() {
//         return (
//             <div>
//                 <section className="showcase">
//                     <div className="showcase__header">
//                         <div className="showcase__image-section-container">
//                             <img src={this.props.playlistImage} alt="" className="showcase__image"></img>
//                             <button 
//                                 className="button button--push-down"
//                                 onClick={() => this.props.imageUploadModalOpen({playlistID: this.props.playlistID})}
//                             >Upload Image</button>
//                         </div>
//                         <div className="showcase__info">
//                             <UserPlaylistName 
//                                 editName={this.editName}
//                                 saveName={this.saveName}
//                                 updateLocalName={this.updateLocalName}
//                                 isEditingName={this.state.isEditingName}
//                                 localName={this.state.localName}
//                                 playlistName={this.props.playlistName}
//                             />
//                             <p className="showcase__paragraph">A playlist by {this.props.ownerName}</p>
//                         </div>
//                     </div>
//                     <PlaylistTracks 
//                         playlistTracks={this.props.playlistTracks}
//                         currentlySelectedCollection={this.props.currentlySelectedCollection}
//                         playPauseTrack={this.props.playPauseTrack}
//                         currentPage={this.state.currentPage}
//                         playlistID={this.props.playlistID}
//                         ownerID={this.props.ownerID}
//                         userID={this.props.userID}
//                         accessToken={this.props.accessToken}
//                     />
//                 </section>
//                 <Paginator 
//                     totalItems={this.props.playlistTracks.length}
//                     itemsPerPage={50}
//                     currentPage={this.state.currentPage}
//                     setPage={this.setPage}
//                 />
//             </div>
//         );
//     }

// }

const mapStateToProps = state => ({
    userID: state.userInfo.userID
});

export default connect(
    mapStateToProps, 
    {
        updatePlaylistName: ActionCreators.updatePlaylistName,
        imageUploadModalOpen: ActionCreators.imageUploadModalOpen
    }
)(withPagination(UserPlaylist)); 
