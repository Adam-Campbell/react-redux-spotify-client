import * as ActionTypes from '../actiontypes';
import { fetchWrapper } from './helpers';

//
// Exported thunk action
//

export function fetchSearchResults(query, token) {
    return async function(dispatch) {
        dispatch(requestSearchResults());

        const searchResults = await fetchWrapper(`https://api.spotify.com/v1/search?q=${query}&type=artist`, token);
        const artistsArray = searchResults.artists.items.map(artist => searchResultObjectCreator(artist));   

        dispatch(receiveSearchResults(artistsArray));
    }
}


//
// Other actions 
//

export function updateSearch(search) {
    return {
        type: ActionTypes.UPDATE_SEARCH,
        payload: search
    }
}

function requestSearchResults() {
    return {
        type: ActionTypes.FETCH_SEARCH_RESULTS_REQUEST
    }
}

function receiveSearchResults(results) {
    return {
        type: ActionTypes.FETCH_SEARCH_RESULTS_SUCCESS,
        payload: results
    }
}


//
// Helper functions 
//

function searchResultObjectCreator(data) {
    return {
        artistName: data.name, 
        artistID: data.id,
        artistImage: (data.images.length) ? data.images[0].url : ''
    };
}




