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

        case ActionTypes.UPDATE_PLAYLIST_IMAGE_SUCCESS:
            return {
                ...state,
                playlistData: {
                    ...state.playlistData,
                    [action.payload.key]: {
                        ...state.playlistData[action.payload.key],
                        playlistImage: [
                            {
                                height: null,
                                width: null,
                                url: action.payload.imageURL
                            }
                        ]
                    }
                }
            }

        case ActionTypes.UPDATE_PLAYLIST_NAME_SUCCESS: 
            return {
                ...state,
                playlistData: {
                    ...state.playlistData,
                    [action.payload.key]: {
                        ...state.playlistData[action.payload.key],
                        playlistName: action.payload.newName
                    }
                }
            }

        case ActionTypes.DELETE_TRACK_FROM_PLAYLIST_SUCCESS:
            return {
                ...state,
                playlistData: {
                    ...state.playlistData,
                    [action.payload.key]: {
                        ...state.playlistData[action.payload.key],
                        playlistTracks: [
                            ...state.playlistData[action.payload.key].playlistTracks.slice(0, action.payload.index),
                            ...state.playlistData[action.payload.key].playlistTracks.slice(action.payload.index + 1)
                        ]
                    }
                }
            }

        case ActionTypes.ADD_TRACK_TO_PLAYLIST_SUCCESS:
            return {
                ...state,
                playlistData: {
                    ...state.playlistData,
                    [action.payload.key]: {
                        ...state.playlistData[action.payload.key],
                        playlistTracks: [
                            ...state.playlistData[action.payload.key].playlistTracks,
                            action.payload.track
                        ]
                    }
                }
            }

        default:
            return state;

    }
}


// case ActionTypes.ADD_TRACK_TO_PLAYLIST_SUCCESS:
//     return {
//         ...state,
//         playlistData: {
//             ...state.playlistData,
//             [action.payload.key]: {
//                 ...state.playlistData[action.payload.key],
//                 playlistTracks: [
//                     ...state.playlistData[action.payload.key].playlistTracks,
//                     action.payload.track
//                 ]
//             }
//         }
//     }