import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';

const AddTrackButton = props => (
    <div 
        className="tooltip-group-container tooltip-group-container--push-left"
        onClick={(e) => {
                e.stopPropagation();
                props.addTrackModalOpen(props.track);
            }
        }
    >
        <span className="tooltip">Add To Playlist</span>
        <FontAwesomeIcon
            icon={faPlus}
            
        />
    </div>
);

AddTrackButton.propTypes = {
    track: PropTypes.object
}

export default connect(
    null,
    {addTrackModalOpen: ActionCreators.addTrackModalOpen}
)(AddTrackButton); 