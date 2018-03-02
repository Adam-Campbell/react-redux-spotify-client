import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';

const RemoveTrackButton = props => {
    if (props.ownerID === props.userID) {
        return (
            <div 
                className="tooltip-group-container"
                onClick={e => {
                        e.stopPropagation();
                        props.deleteTrackFromPlaylist(props.ownerID, props.playlistID, props.trackURI, props.index, props.accessToken);
                    }
                }
            >
                <span className="tooltip tooltip--wide">Remove From Playlist</span>
                <FontAwesomeIcon icon={faTimes} />
            </div>
        );
    }
    return null;
};

RemoveTrackButton.propTypes = {
    index: PropTypes.number,
    trackURI: PropTypes.string,
    playlistID: PropTypes.string,
    ownerID: PropTypes.string,
    userID: PropTypes.string,
    accessToken: PropTypes.string,
}

const mapStateToProps = state => ({
    accessToken: state.accessToken.token
});

export default connect(
    mapStateToProps, 
    {deleteTrackFromPlaylist: ActionCreators.deleteTrackFromPlaylist}
)(RemoveTrackButton); 