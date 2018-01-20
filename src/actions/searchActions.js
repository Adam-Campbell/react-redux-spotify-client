import * as ActionTypes from '../actiontypes';


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

function searchResultObjectCreator(data) {
    return {
        artistName: data.name, 
        artistID: data.id,
        artistImage: (data.images.length) ? data.images[0].url : ''
    };
}

export function fetchSearchResults(query, token) {
    return async function(dispatch) {
        dispatch(requestSearchResults());
        const endpoint = `https://api.spotify.com/v1/search?q=${query}&type=artist&access_token=${token}`;
        const response = await fetch(endpoint);
        const json = await response.json();
        const artistsArray = json.artists.items.map(artist => searchResultObjectCreator(artist));   
        dispatch(receiveSearchResults(artistsArray));
    }
}


