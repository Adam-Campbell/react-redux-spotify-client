import * as ActionTypes from '../actiontypes';


export default function searchResults(state=[], action) {
    switch(action.type) {

        case ActionTypes.FETCH_SEARCH_RESULTS_SUCCESS:
            return (action.payload.length) ? action.payload : state;

        default:
            return state;
    }
}
