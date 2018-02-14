import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import AddTrackModalListItem from './AddTrackModalListItem'; 

class AddTrackModal extends Component {
    
    render() {
        if (this.props.currentModal === 'AddTrackModal') {
            return (
                <div className="modal__overlay">
                    <div className="modal__dialog-box">
                        <h1 className="modal__title">Select a playlist to add the track to</h1>

                        <ul className="modal__list">
                            {
                                this.props.playlists.map((playlist, index) => {
                                    if (playlist.ownerID === this.props.userID) {
                                       return (
                                            <AddTrackModalListItem 
                                                key={index}
                                                addTrackToPlaylist={this.props.addTrackToPlaylist}
                                                playlistName={playlist.playlistName}
                                                playlistID={playlist.playlistID}
                                                playlistImage={playlist.playlistImage}
                                                userID={this.props.userID}
                                                trackToAdd={this.props.trackToAdd}
                                                accessToken={this.props.accessToken}
                                            />
                                       ); 
                                } else {
                                    return null;
                                }
                                })
                            }
                        </ul>

                        <button
                            className="modal__button"
                            onClick={this.props.closeModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

const mapStateToProps = state => {
    return {
        currentModal: state.modalInfo.currentModal,
        trackToAdd: state.modalInfo.modalData,
        accessToken: state.accessToken,
        userID: state.userInfo.userID,
        playlists: state.userInfo.playlists
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTrackModalClose() {
            dispatch(
                ActionCreators.addTrackModalClose()
            );
        },
        addTrackToPlaylist(ownerID, playlistID, trackToAdd, token) {
            dispatch(
                ActionCreators.addTrackToPlaylist(ownerID, playlistID, trackToAdd, token)
            );
        },
        closeModal() {
            dispatch(
                ActionCreators.closeModal()
            );
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(AddTrackModal); 





// return (
//     <li
//         key={index}
//         onClick={
//             () => this.props.addTrackToPlaylist(
//                                     this.props.userID, 
//                                     playlist.playlistID, 
//                                     this.props.trackToAdd, 
//                                     this.props.accessToken
//                                 )
//         }
//     >
//         <p className="modal__text">{playlist.playlistName}</p>  
//     </li>
// )