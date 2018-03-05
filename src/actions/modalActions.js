import * as ActionTypes from '../actiontypes';

export const addTrackModalOpen = track => ({
    type: ActionTypes.OPEN_ADD_TRACK_MODAL,
    payload: track
});

export const createNewPlaylistModalOpen = () => ({
    type: ActionTypes.OPEN_CREATE_NEW_PLAYLIST_MODAL
});

export const imageUploadModalOpen = playlistID => ({
    type: ActionTypes.OPEN_IMAGE_UPLOAD_MODAL,
    payload: playlistID
});

export const errorModalOpen = errorInfo => ({
    type: ActionTypes.OPEN_ERROR_MODAL,
    payload: errorInfo
});

export const closeModal = () => ({
    type: ActionTypes.CLOSE_MODAL
});