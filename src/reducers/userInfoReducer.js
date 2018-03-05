import * as ActionTypes from '../actiontypes';

const defaultState = {
    userName: '',
    userID: '',
    userImage: '',
    topTracks: [],
    topArtists: [],
    playlists: [],
    recentTracks: [],
    isFetching: false,
    hasFetched: false
};


const userInfo = (state=defaultState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_USER_REQUEST:
            return {
                ...state,
                isFetching: true
            }

        case ActionTypes.FETCH_USER_SUCCESS:
            return {
                ...action.payload,
                hasFetched: true,
                isFetching: false
            };

        case ActionTypes.UPDATE_PLAYLIST_IMAGE_SUCCESS:
            return {
                ...state,
                playlists: state.playlists.map(playlist => {
                    if (playlist.playlistID === action.payload.key) {
                        return {
                            ...playlist,
                            playlistImage: action.payload.imageURL
                        };
                    } else {
                        return playlist;
                    }
                })
            };

        case ActionTypes.UPDATE_PLAYLIST_NAME_SUCCESS:
            return {
                ...state,
                playlists: state.playlists.map(playlist => {
                    if (playlist.playlistID === action.payload.key) {
                        return {
                            ...playlist, 
                            playlistName: action.payload.newName
                        };
                    } else {
                        return playlist;
                    }
                })
            }

        case ActionTypes.CREATE_PLAYLIST_SUCCESS:
            return {
                ...state,
                playlists: [
                    action.payload,
                    ...state.playlists
                ]
            }

        default:
            return state;

    }
}

export default userInfo;