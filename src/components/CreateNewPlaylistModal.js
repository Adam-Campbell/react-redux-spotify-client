import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';



class CreateNewPlaylistModal extends Component {
    
    constructor(props) {
        super(props);
        this.updateLocalPlaylistName = this.updateLocalPlaylistName.bind(this);
        this.state = {
            localPlaylistName: ''
        }
    }

    updateLocalPlaylistName(newName) {
        this.setState({localPlaylistName: newName});
    }

    render() {
        if (this.props.currentModal === 'CreateNewPlaylistModal') {
            return (
                <div className="modal__overlay">
                    <div className="modal__dialog-box">
                    <h1 className="modal__title">Create A Playlist</h1>
                        <input 
                            type="text"
                            className="modal__text-input"
                            value={this.state.localPlaylistName}
                            placeholder="Name your new playlist"
                            onChange={(e) => this.updateLocalPlaylistName(e.target.value)}
                        >
                        </input>

                        <button
                            className="modal__button"
                            onClick={() => this.props.createPlaylist(this.state.localPlaylistName)}
                        >
                            Create Playlist
                        </button>

                        <button
                            className="modal__button modal__button--margin-left"
                            onClick={this.props.closeModal}
                        >Cancel</button>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = state => {
    return {
        currentModal: state.modalInfo.currentModal
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createPlaylist(newPlaylistName) {
            dispatch(
                ActionCreators.createPlaylist(newPlaylistName)
            );
        },
        closeModal() {
            dispatch(
                ActionCreators.closeModal()
            );
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateNewPlaylistModal); 