import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';

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

    render() {
        return (
            <div className="card-collection__card-holder">
                <div 
                    className="create-new-playlist-card"
                    onClick={this.props.createNewPlaylistModalOpen}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <p className="create-new-playlist-card__text">Create New Playlist</p>
                </div>
            </div>
        ); 
    }
}

CreateNewPlaylistCard.propTypes = {

};


const mapStateToProps = props => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {
        createNewPlaylistModalOpen() {
            dispatch(
                ActionCreators.createNewPlaylistModalOpen()
            );
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateNewPlaylistCard);