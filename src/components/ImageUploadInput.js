import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faUpload from '@fortawesome/fontawesome-free-solid/faUpload';

class ImageUploadInput extends Component {
    
    constructor(props) {
        super(props);
        this.saveImageToStore = this.saveImageToStore.bind(this);
        this.checkForFile = this.checkForFile.bind(this);
        this.reader = new FileReader();
        this.reader.addEventListener('load', this.saveImageToStore);
    }

    saveImageToStore() {
        let result = this.reader.result;
        this.convertToJPEG(result)
        .then(result => {
            this.props.updatePlaylistImage(
                this.props.ownerID, this.props.playlistID, result, this.props.accessToken
            );
            this.props.closeModal();
        });   
    }

    checkForFile() {
        const imageFile = document.querySelector('.modal__file-input').files[0];
        if (imageFile) {
            this.reader.readAsDataURL(imageFile);  
        }
    }

    convertToJPEG(imageURL) {
        // Takes image, paints it to a canvas in memory (not in DOM),
        // then exports canvas as JPEG (only format accepted by Spotify).
        return new Promise(
            (resolve, reject) => { 
                const image = new Image();
                
                image.addEventListener('load', () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = image.width;
                    canvas.height = image.height;
                    ctx.drawImage(image, 0, 0);
                    const newImageURL = canvas.toDataURL('image/jpeg');
                    resolve(newImageURL);
                });
                image.src = imageURL;
            }
        )
    }

    render() {
        return (
            <React.Fragment>
                <input
                    type="file"
                    name="fileInput"
                    id="fileInput"
                    className="modal__file-input"
                    onChange={this.checkForFile}
                >
                </input>
                <label 
                    htmlFor="fileInput"
                    className="modal__file-input__label"
                >
                    <FontAwesomeIcon icon={faUpload}/>
                    <span className="modal__file-input__label-text">Choose an image</span>
                </label>
            </React.Fragment>
        )
    }

}

export default connect(
    null, 
    {
        updatePlaylistImage: ActionCreators.updatePlaylistImage,
        closeModal: ActionCreators.closeModal
    }
)(ImageUploadInput);