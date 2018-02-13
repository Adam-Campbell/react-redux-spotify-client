import * as ActionTypes from '../actiontypes';

export function addTrackModalOpen(trackURI) {
    return {
        type: ActionTypes.ADD_TRACK_MODAL_OPEN,
        payload: trackURI
    }
}

export function addTrackModalClose() {
    return {
        type: ActionTypes.ADD_TRACK_MODAL_CLOSE,
    }
}