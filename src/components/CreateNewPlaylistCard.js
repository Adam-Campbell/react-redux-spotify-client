import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';

const CreateNewPlaylistCard = props => (
    <div className="card-collection__card-holder">
        <div className="create-new-playlist-card" onClick={props.createNewPlaylistModalOpen}>
            <FontAwesomeIcon icon={faPlus} />
            <p className="create-new-playlist-card__text">Create New Playlist</p>
        </div>
    </div>
);

export default connect(
    null,
    {createNewPlaylistModalOpen: ActionCreators.createNewPlaylistModalOpen}
)(CreateNewPlaylistCard);