import * as ActionTypes from '../actiontypes';

const defaultState = {
    results: {
        artists: [],
        albums: [],
        playlists: []
    },
    currentSearch: ''
}


const searchResults = (state=defaultState, action) => {
    switch(action.type) {
        case ActionTypes.UPDATE_SEARCH:
            return {
                ...state,
                currentSearch: action.payload
            }

        case ActionTypes.FETCH_SEARCH_RESULTS_SUCCESS:
            return {
                ...state,
                results: action.payload
            }

        default:
            return state;
    }
}

export default searchResults;
