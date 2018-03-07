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
        this.canvasAndBack = this.canvasAndBack.bind(this);
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
                    const finalImageURL = this.canvasAndBack(image, image.width, image.height)
                    resolve(finalImageURL);
                });
                image.src = imageURL;
            }
        )
    }

    /*
    The canvasAndBack method is responsible for two things - converting non jpeg images to
    jpeg images (as this is all that Spotify accept) and making the images smaller if required
    (Spotify have a 256kb filesize limit). See this Stack Overflow page:
    
    https://stackoverflow.com/questions/18557497/how-to-get-html5-canvas-todataurl-file-size-in-javascript

    Making the file size smaller is just achieved by making the image smaller (width and height).
    
    There are two versions of this method, one which loads the canvas once, looks at the size of resulting
    dataURL and uses that to calculate the dimensions that it should rerender the canvas at. The second version
    of this method just recursively makes the image smaller (75% of it's previous size on each recursive call)
    until it reaches a size that makes the dataURL small enough. 

    The first method results in image files that are much smaller than they need to be, which leads me to believe
    that the resulting file size does not scale linearly with the width and height. The second version of this
    method results in better quality images, and doesn't seem to have any adverse effects on performance despite
    it's recursive nature. Converting a 5mb image took around 2-3 seconds.

    It should be noted that no matter which way I do this Spotify will compress it further on their end turning
    it into a 300 x 300 px image. That said, even after their compression the images made with the second version
    of the canvasAndBack method seem to be higher quality.
    */


    // canvasAndBack(image, width, height) {
    //     const canvas = document.createElement('canvas');
    //     const ctx = canvas.getContext('2d');
    //     canvas.width = width;
    //     canvas.height = height;
    //     ctx.drawImage(image, 0, 0, width, height);
    //     const newImageURL = canvas.toDataURL('image/jpeg');
    //     const estimatedFileSize = Math.round(newImageURL.length * 3/4);
    //     if (estimatedFileSize <= 250000) {
    //         return newImageURL;
    //     }
    //     const divisor = estimatedFileSize / 250000;
    //     const newWidth = width / divisor;
    //     const newHeight = height / divisor;
    //     return this.canvasAndBack(image, newWidth, newHeight);
    // }
    canvasAndBack(image, width, height) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, 0, 0, width, height);
        const newImageURL = canvas.toDataURL('image/jpeg');
        const estimatedFileSize = Math.round(newImageURL.length * 3/4);
        if (estimatedFileSize <= 200000) {
            return newImageURL;
        }
        const newWidth = Math.round(width * 0.75);
        const newHeight = Math.round(height * 0.75);
        return this.canvasAndBack(image, newWidth, newHeight);
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






















































// class ImageUploadInput extends Component {
    
//     constructor(props) {
//         super(props);
//         this.saveImageToStore = this.saveImageToStore.bind(this);
//         this.checkForFile = this.checkForFile.bind(this);
//         this.reader = new FileReader();
//         this.reader.addEventListener('load', this.saveImageToStore);
//     }

//     saveImageToStore() {
//         let result = this.reader.result;
//         this.convertToJPEG(result)
//         .then(result => {
//             this.props.updatePlaylistImage(
//                 this.props.ownerID, this.props.playlistID, result, this.props.accessToken
//             );
//             this.props.closeModal();
//         });   
//     }

//     checkForFile() {
//         const imageFile = document.querySelector('.modal__file-input').files[0];
//         if (imageFile) {
//             this.reader.readAsDataURL(imageFile);  
//         }
//     }

//     convertToJPEG(imageURL) {
//         // Takes image, paints it to a canvas in memory (not in DOM),
//         // then exports canvas as JPEG (only format accepted by Spotify).
//         return new Promise(
//             (resolve, reject) => { 
//                 const image = new Image();
                
//                 image.addEventListener('load', () => {
//                     const canvas = document.createElement('canvas');
//                     const ctx = canvas.getContext('2d');
//                     canvas.width = image.width;
//                     canvas.height = image.height;
//                     ctx.drawImage(image, 0, 0);
//                     const newImageURL = canvas.toDataURL('image/jpeg').replace(/^data:image\/(jpeg|jpg|png);base64,/, '');
//                     const estimatedFileSize = Math.round(newImageURL.length * 3/4);
//                     console.log(estimatedFileSize);
//                     //const newImageURL = canvas.toDataURL('image/jpeg');
//                     //console.log(newImageURL);
//                     resolve(newImageURL);
//                     //console.log('we skipped the toDataURL...');
//                 });
//                 image.src = imageURL;
//             }
//         )
//     }

//     canvasAndBack(width, height, image) {
//         // does the canvas operations

//         // takes the resulting image URI and performs the math to work out if it's small enough

//         // if it isn't then it calls itself again

//         // returns the URI
//     }

//     render() {
//         return (
//             <React.Fragment>
//                 <input
//                     type="file"
//                     name="fileInput"
//                     id="fileInput"
//                     className="modal__file-input"
//                     onChange={this.checkForFile}
//                 >
//                 </input>
//                 <label 
//                     htmlFor="fileInput"
//                     className="modal__file-input__label"
//                 >
//                     <FontAwesomeIcon icon={faUpload}/>
//                     <span className="modal__file-input__label-text">Choose an image</span>
//                 </label>
//             </React.Fragment>
//         )
//     }

// }

// export default connect(
//     null, 
//     {
//         updatePlaylistImage: ActionCreators.updatePlaylistImage,
//         closeModal: ActionCreators.closeModal
//     }
// )(ImageUploadInput);