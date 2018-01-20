import * as ActionTypes from '../actiontypes';


export default function isFetchingArtist(state=false, action) {
    switch(action.type) {
        case ActionTypes.FETCH_ARTIST_REQUEST:
            return true;

        case ActionTypes.FETCH_ARTIST_SUCCESS:
            return false;

        default:
            return state;
    }
}