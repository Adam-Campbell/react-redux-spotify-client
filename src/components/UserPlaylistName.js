import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPencilAlt from '@fortawesome/fontawesome-free-solid/faPencilAlt';

const UserPlaylistName = props => {
    if (props.isEditingName) {
        return (
            <div className="album__text-input-container">
                <input 
                    className="album__text-input"
                    value={props.localName} 
                    onChange={e => props.updateLocalName(e)}
                >
                </input>
                <button
                    className="album__submit-button"
                    onClick={e => props.saveName(e)}
                >
                    Save
                </button>
            </div>
        );
    }
    else {
        return (
            <h1 
                className="heading heading--regular heading--editable" 
                onClick={props.editName}
            >
                {props.playlistName}
                <FontAwesomeIcon icon={faPencilAlt}/>
            </h1>
        );
    }
}

UserPlaylistName.propTypes = {
    editName: PropTypes.func,
    saveName: PropTypes.func,
    updateLocalName: PropTypes.func,
    isEditingName: PropTypes.bool,
    localName: PropTypes.string,
    playlistName: PropTypes.string
}

export default UserPlaylistName;