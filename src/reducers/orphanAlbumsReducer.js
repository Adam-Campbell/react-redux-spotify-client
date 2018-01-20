import * as ActionTypes from '../actiontypes';


export default function orphanAlbums(state={}, action) {
    switch (action.type) {

        case ActionTypes.FETCH_ORPHAN_ALBUM_SUCCESS:
            return {
                ...state,
                [action.payload.key]: {
                    ...action.payload.album
                }
            };

        default:
            return state;

    }
}
