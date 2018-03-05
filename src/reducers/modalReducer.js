import * as ActionTypes from '../actiontypes';

const defaultState = {
    currentModal: '',
    modalData: {}
};

const modalInfo = (state=defaultState, action) => {
    switch(action.type) {
        case ActionTypes.OPEN_ADD_TRACK_MODAL:
            return {
                currentModal: 'AddTrackModal',
                modalData: {
                    ...action.payload
                }
            };

        case ActionTypes.OPEN_CREATE_NEW_PLAYLIST_MODAL:
            return {
                currentModal: 'CreateNewPlaylistModal',
                modalData: {}
            };

        case ActionTypes.OPEN_IMAGE_UPLOAD_MODAL:
            return {
                currentModal: 'ImageUploadModal',
                modalData: {
                    ...action.payload
                }
            };

        case ActionTypes.OPEN_ERROR_MODAL:
            return {
                currentModal: 'ErrorModal',
                modalData: {
                    ...action.payload
                }
            };

        case ActionTypes.CLOSE_MODAL:
            return defaultState;

        default:
            return state;
    }
}

export default modalInfo;