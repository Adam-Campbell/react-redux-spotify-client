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
        if (this.props.isShowingCreateNewPlaylistModal) {
            return (
                <div className="modal__overlay">
                    <div className="modal__dialog-box">
                        <input 
                            type="text"
                            className="modal__input"
                            value={this.state.localPlaylistName}
                            onChange={(e) => this.updateLocalPlaylistName(e.target.value)}
                        >
                        </input>

                        <button
                            onClick={() => this.props.createPlaylist(this.state.localPlaylistName)}
                        >
                            Create Playlist
                        </button>

                        <button
                            onClick={this.props.toggleCreateNewPlaylistModal}
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

    }
};

const mapDispatchToProps = dispatch => {
    return {
        createPlaylist(newPlaylistName) {
            dispatch(
                ActionCreators.createPlaylist(newPlaylistName)
            );
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateNewPlaylistModal); 