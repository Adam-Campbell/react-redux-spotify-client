import * as ActionTypes from '../actiontypes';


export default function playlists(state={}, action) {
    switch (action.type) {

        case ActionTypes.FETCH_PLAYLIST_SUCCESS:
            return {
                ...state,
                [action.payload.key]: {
                    ...action.payload.playlistObject
                }
            };

        default:
            return state;

    }
}
