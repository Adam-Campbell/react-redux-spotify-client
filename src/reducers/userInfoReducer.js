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


export default function userInfo(state=defaultState, action) {
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

        default:
            return state;

    }
}
