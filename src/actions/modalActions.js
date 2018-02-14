import * as ActionTypes from '../actiontypes';

export function addTrackModalOpen(track) {
    return {
        type: ActionTypes.OPEN_ADD_TRACK_MODAL,
        payload: track
    }
}

export function createNewPlaylistModalOpen() {
    return {
        type: ActionTypes.OPEN_CREATE_NEW_PLAYLIST_MODAL
    }
}

export function imageUploadModalOpen(playlistID) {
    return {
        type: ActionTypes.OPEN_IMAGE_UPLOAD_MODAL,
        payload: playlistID
    }
}

export function closeModal() {
    return {
        type: ActionTypes.CLOSE_MODAL
    }
}