import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import FadeInContainer from './FadeInContainer';

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
                <FadeInContainer>
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
                                className="button button--light"
                                onClick={() => {
                                    this.props.createPlaylist(this.state.localPlaylistName);
                                    this.props.closeModal();
                                }}
                            >Create Playlist</button>

                            <button
                                className="button button--light button--push-right"
                                onClick={this.props.closeModal}
                            >Cancel</button>

                        </div>
                    </div>
                </FadeInContainer>
            );
        }
        return null;
    }
}

const mapStateToProps = state => ({
    currentModal: state.modalInfo.currentModal
});

export default connect(
    mapStateToProps, 
    {
        createPlaylist: ActionCreators.createPlaylist,
        closeModal: ActionCreators.closeModal
    }
)(CreateNewPlaylistModal); 