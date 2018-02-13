import * as ActionTypes from '../actiontypes';

const defaultState = {
    isShowing: false,
    trackToAdd: ''
};

export default function addTrackModalInfo(state=defaultState, action) {
    switch(action.type) {

        case ActionTypes.ADD_TRACK_MODAL_OPEN:
            return {
                isShowing: true,
                trackToAdd: action.payload
            };

        case ActionTypes.ADD_TRACK_MODAL_CLOSE:
            return {
                isShowing: false,
                trackToAdd: ''
            };

        default:
            return state;

    }
}