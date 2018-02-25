import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import ImageUploadInput from './ImageUploadInput';
import FadeInContainer from './FadeInContainer';

const ImageUploadModal = props => {
    if (props.currentModal === 'ImageUploadModal') {
        return (
            <FadeInContainer>
                <div className="modal__overlay">
                    <div className="modal__dialog-box">
                        <h1 className="modal__title">Image Upload</h1>
                        <p className="modal__text">Please use the button below to upload a new image for this playlist.</p>
                        <ImageUploadInput 
                            playlistID={props.playlistID}
                            ownerID={props.ownerID}
                            accessToken={props.accessToken}
                        />
                        <button
                            className="modal__button modal__button--margin-left"
                            onClick={props.closeModal}
                        >Cancel</button>
                    </div>
                </div>
            </FadeInContainer>
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
