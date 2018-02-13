import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImageUploadInput from './ImageUploadInput';

class ImageUploadModal extends Component {
    render() {
        if (this.props.isShowingImageUploadModal) {
            return (
                <div className="modal__overlay">
                    <div className="modal__dialog-box">
                        <h1>Please Upload Your Image Using The Stuff Below</h1>
                        <p>There will eventually be stuff here that lets you upload an image!!1!1</p>
                        <ImageUploadInput 
                            playlistID={this.props.playlistID}
                            ownerID={this.props.ownerID}
                            accessToken={this.props.accessToken}
                        />
                        <button
                            onClick={this.props.toggleImageUploadModal}
                        >Close now plz</button>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

ImageUploadModal.propTypes = {
    isShowingImageUploadModal: PropTypes.bool,
    toggleImageUploadModal: PropTypes.func
}

export default ImageUploadModal;