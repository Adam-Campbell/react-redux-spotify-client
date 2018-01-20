import * as ActionTypes from '../actiontypes';


export default function isFetchingPlaylist(state=false, action) {
    switch(action.type) {
        case ActionTypes.FETCH_PLAYLIST_REQUEST:
            return true;

        case ActionTypes.FETCH_PLAYLIST_SUCCESS:
            return false;

        default:
            return state;
    }
}
