import * as ActionTypes from '../actiontypes';

const defaultState = {
    albumData: {},
    isFetching: false
}


export default function orphanAlbums(state=defaultState, action) {
    switch (action.type) {

        case ActionTypes.FETCH_ORPHAN_ALBUM_REQUEST:
            return {
                ...state,
                isFetching: true
            }

        case ActionTypes.FETCH_ORPHAN_ALBUM_SUCCESS:
            return {
                albumData: {
                    ...state.albumData,
                    [action.payload.key]: {
                        ...action.payload.album
                    }
                },
                isFetching: false
            };

        default:
            return state;

    }
}
