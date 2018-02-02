import * as ActionTypes from '../actiontypes';

const defaultState = {
    results: [],
    currentSearch: ''
}


export default function searchResults(state=defaultState, action) {
    switch(action.type) {

        case ActionTypes.UPDATE_SEARCH:
            return {
                ...state,
                currentSearch: action.payload
            }

        case ActionTypes.FETCH_SEARCH_RESULTS_SUCCESS:
            return {
                ...state,
                results: action.payload.length ? action.payload : state,
            }

        default:
            return state;
    }
}
