import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';

import ImageUploadInput from './ImageUploadInput';

class ImageUploadModal extends Component {
    render() {
        if (this.props.currentModal === 'ImageUploadModal') {
            return (
                <div className="modal__overlay">
                    <div className="modal__dialog-box">
                        <h1 className="modal__title">Image Upload</h1>
                        <p className="modal__text">Please use the button below to upload a new image for this playlist.</p>
                        <ImageUploadInput 
                            playlistID={this.props.playlistID}
                            ownerID={this.props.ownerID}
                            accessToken={this.props.accessToken}
                        />
                        <button
                            className="modal__button modal__button--margin-left"
                            onClick={this.props.closeModal}
                        >Cancel</button>
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
        playlistID: state.modalInfo.modalData.playlistID,
        ownerID: state.userInfo.userID,
        accessToken: state.accessToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModal() {
            dispatch(
                ActionCreators.closeModal()
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploadModal);
