import * as ActionTypes from '../actiontypes';

const defaultState = {
    playlistData: {},
    isFetching: false
}


export default function playlists(state=defaultState, action) {
    switch (action.type) {

        case ActionTypes.FETCH_PLAYLIST_REQUEST:
            return {
                ...state,
                isFetching: true
            }

        case ActionTypes.FETCH_PLAYLIST_SUCCESS:
            return {
                playlistData: {
                    ...state.playlistData,
                    [action.payload.key]: {
                        ...action.payload.playlistObject
                    }
                },
                isFetching: false
            }

        default:
            return state;

    }
}
