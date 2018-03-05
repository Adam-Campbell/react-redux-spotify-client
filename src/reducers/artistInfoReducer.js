import * as ActionTypes from '../actiontypes';

const defaultState = {
    artistData: {},
    isFetching: false,
    currentArtist: ''
};

const artistInfo = (state=defaultState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_ARTIST_REQUEST:
            return {
                ...state,
                isFetching: true
            }

        case ActionTypes.FETCH_ARTIST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                artistData:{
                    ...state.artistData,
                    [action.payload.artistID]: {
                        ...action.payload.artistObject
                    }
                }
            }

        case ActionTypes.SWITCH_CURRENT_ARTIST:
            return {
                ...state,
                currentArtist: action.payload
            }

        default:
            return state;
    }      
}

export default artistInfo;