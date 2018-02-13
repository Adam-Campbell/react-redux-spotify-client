import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import Portal from './Portal';
import CreateNewPlaylistModal from './CreateNewPlaylistModal';


// const CreateNewPlaylistCard = props => {
//     return (
//         <div className="card-collection__card-holder">
//             <div className="create-new-playlist-card">
//                 <FontAwesomeIcon icon={faPlus} />
//                 <p className="create-new-playlist-card__text">Create New Playlist</p>
//             </div>
//         </div>
//     )
// }

class CreateNewPlaylistCard extends Component {

    constructor(props) {
        super(props);
        this.toggleCreateNewPlaylistModal = this.toggleCreateNewPlaylistModal.bind(this);
        this.state = {
            isShowingCreateNewPlaylistModal: false
        };
    }

    toggleCreateNewPlaylistModal() {
        this.setState({isShowingCreateNewPlaylistModal: !this.state.isShowingCreateNewPlaylistModal})
    }

    render() {
        return (
            <div className="card-collection__card-holder">
                <div 
                    className="create-new-playlist-card"
                    onClick={this.toggleCreateNewPlaylistModal}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <p className="create-new-playlist-card__text">Create New Playlist</p>
                </div>
                <Portal>
                    <CreateNewPlaylistModal 
                        toggleCreateNewPlaylistModal={this.toggleCreateNewPlaylistModal}
                        isShowingCreateNewPlaylistModal={this.state.isShowingCreateNewPlaylistModal}
                    />
                </Portal>
            </div>
        ); 
    }
}

CreateNewPlaylistCard.propTypes = {

};




export default CreateNewPlaylistCard;