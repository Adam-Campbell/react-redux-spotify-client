import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import AddTrackModalListItem from './AddTrackModalListItem'; 
import FadeInContainer from './FadeInContainer';
import { imageSizePicker } from '../imageSizePicker';


const AddTrackModal = props => {
    if (props.currentModal === 'AddTrackModal') {
        return (
            <FadeInContainer>
                <div className="modal__overlay">
                    <div className="modal__dialog-box">
                        <h1 className="modal__title">Select a playlist to add the track to</h1>

                        <ul className="modal__list">
                            {
                                props.playlists.map((playlist, index) => {
                                    if (playlist.ownerID === props.userID) {
                                    return (
                                            <AddTrackModalListItem 
                                                key={index}
                                                addTrackToPlaylist={props.addTrackToPlaylist}
                                                playlistName={playlist.playlistName}
                                                playlistID={playlist.playlistID}
                                                playlistImage={imageSizePicker(playlist.playlistImage, 80, 80)}
                                                userID={props.userID}
                                                trackToAdd={props.trackToAdd}
                                                accessToken={props.accessToken}
                                            />
                                    ); 
                                    } else {
                                        return null;
                                    }
                                })
                            }
                        </ul>

                        <button
                            className="button button--light"
                            onClick={props.closeModal}
                        >Cancel</button>

                    </div>
                </div>
            </FadeInContainer>
        );
    }
    return null;
}

const mapStateToProps = state => ({
    currentModal: state.modalInfo.currentModal,
    trackToAdd: state.modalInfo.modalData,
    accessToken: state.accessToken.token,
    userID: state.userInfo.userID,
    playlists: state.userInfo.playlists
});

export default connect(
    mapStateToProps, 
    {
        addTrackToPlaylist: ActionCreators.addTrackToPlaylist,
        closeModal: ActionCreators.closeModal
    }
)(AddTrackModal);