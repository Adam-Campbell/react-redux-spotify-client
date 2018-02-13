import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';

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
        .then(result => this.props.updatePlaylistImage(this.props.ownerID, this.props.playlistID, result, this.props.accessToken));   
    }

    checkForFile() {
        const imageFile = document.querySelector('.modal__input').files[0];
        if (imageFile) {
            this.reader.readAsDataURL(imageFile);  
        }
    }

    convertToJPEG(imageURL) {
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
            <input
                type="file"
                className="modal__input"
                onChange={this.checkForFile}
            >
            </input>
        )
    }

}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePlaylistImage(ownerID, playlistID, image, accessToken) {
            dispatch(
                ActionCreators.updatePlaylistImage(ownerID, playlistID, image, accessToken)
            );
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ImageUploadInput);