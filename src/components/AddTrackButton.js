import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';

const AddTrackButton = props => (
    <FontAwesomeIcon
        icon={faPlus}
        onClick={(e) => {
                e.stopPropagation();
                props.addTrackModalOpen(props.track);
            }
        }
    />
);

AddTrackButton.propTypes = {
    track: PropTypes.object
}

export default connect(
    null,
    {addTrackModalOpen: ActionCreators.addTrackModalOpen}
)(AddTrackButton); 