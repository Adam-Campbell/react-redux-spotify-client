import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faList from '@fortawesome/fontawesome-free-solid/faList';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';

const AddTrackButton = props => {
    return (
        <FontAwesomeIcon
            icon={faPlus}
            onClick={
                (e) => {
                    e.stopPropagation();
                    //console.log(props.trackName, props.trackID);
                    props.addTrackModalOpen(props.track);
                }
            }
        />
    );
}

AddTrackButton.propTypes = {
    track: PropTypes.object
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTrackModalOpen(track) {
            dispatch(
                ActionCreators.addTrackModalOpen(track)
            );
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddTrackButton); 