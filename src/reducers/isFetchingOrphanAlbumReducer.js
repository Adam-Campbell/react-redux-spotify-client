import * as ActionTypes from '../actiontypes';


export default function isFetchingOrphanAlbum(state=false, action) {
    switch(action.type) {
        case ActionTypes.FETCH_ORPHAN_ALBUM_REQUEST:
            return true;

        case ActionTypes.FETCH_ORPHAN_ALBUM_SUCCESS:
            return false;

        default:
            return state;
    }
}
