import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ImageUploadModal from './ImageUploadModal';

class Portal extends Component {
    constructor(props) {
        super(props);
        this.modalRoot = document.getElementById('modal-root');
        this.container = document.createElement('div');
    }

    componentDidMount() {
        this.modalRoot.appendChild(this.container);
    }

    componentWillUnmount() {
        this.modalRoot.removeChild(this.container);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.container
        );
    }
}


export default Portal





// render() {
//     return ReactDOM.createPortal(
//         <ImageUploadModal 
//             isShowingImageUploadModal={this.props.isShowingImageUploadModal}
//             toggleImageUploadModal={this.props.toggleImageUploadModal}
//         />,
//         this.container
//     );
// }