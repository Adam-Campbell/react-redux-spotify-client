import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';

const RemoveTrackButton = props => {
    if (props.ownerID === props.userID) {
        return (
            <FontAwesomeIcon
                icon={faTimes}
                onClick={e => {
                        e.stopPropagation();
                        props.deleteTrackFromPlaylist(props.ownerID, props.playlistID, props.trackURI, props.index, props.accessToken);
                    }
                }
            />
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