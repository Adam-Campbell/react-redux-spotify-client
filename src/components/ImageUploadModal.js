import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import ImageUploadInput from './ImageUploadInput';

const ImageUploadModal = props => {
    if (props.currentModal === 'ImageUploadModal') {
        return (
            <div className="modal__overlay fade-in-quick">
                <div className="modal__dialog-box slide-up">
                    <h1 className="modal__title">Image Upload</h1>
                    <p className="modal__text">Please use the button below to upload a new image for this playlist.</p>
                    <ImageUploadInput 
                        playlistID={props.playlistID}
                        ownerID={props.ownerID}
                        accessToken={props.accessToken}
                    />
                    <button
                        className="button button--light button--push-right"
                        onClick={props.closeModal}
                    >Cancel</button>
                </div>
            </div>
        );
    }
    return null;
};

const mapStateToProps = state => ({
    currentModal: state.modalInfo.currentModal,
    playlistID: state.modalInfo.modalData.playlistID,
    ownerID: state.userInfo.userID,
    accessToken: state.accessToken.token
});

export default connect(
    mapStateToProps, 
    {closeModal: ActionCreators.closeModal}
)(ImageUploadModal);
