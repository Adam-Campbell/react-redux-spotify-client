import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';

class AddTrackModal extends Component {
    
    render() {
        if (this.props.isShowing) {
            return (
                <div className="modal__overlay">
                    <div className="modal__dialog-box">
                        <h1>Select a playlist to add the track to</h1>

                        <ul>
                            {
                                this.props.playlists.map((playlist, index) => {
                                    if (playlist.ownerID === this.props.userID) {
                                        return (
                                            <li
                                                key={index}
                                                onClick={
                                                    () => this.props.addTrackToPlaylist(
                                                                            this.props.userID, 
                                                                            playlist.playlistID, 
                                                                            this.props.trackToAdd, 
                                                                            this.props.accessToken
                                                                        )
                                                }
                                            >
                                                <p>{playlist.playlistName}</p>  
                                            </li>
                                        )
                                } else {
                                    return null;
                                }
                                })
                            }
                        </ul>

                        <button
                            onClick={this.props.addTrackModalClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

const mapStateToProps = state => {
    return {
        isShowing: state.addTrackModalInfo.isShowing,
        trackToAdd: state.addTrackModalInfo.trackToAdd,
        accessToken: state.accessToken,
        userID: state.userInfo.userID,
        playlists: state.userInfo.playlists
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTrackModalClose() {
            dispatch(
                ActionCreators.addTrackModalClose()
            );
        },
        addTrackToPlaylist(ownerID, playlistID, trackToAdd, token) {
            dispatch(
                ActionCreators.addTrackToPlaylist(ownerID, playlistID, trackToAdd, token)
            );
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(AddTrackModal); 