import * as ActionTypes from '../actiontypes';
import { fetchWrapper } from './helpers';

//
// Exported thunk action
//

export function fetchSearchResults(query, token) {
    return async function(dispatch, getState) {

        dispatch(requestSearchResults());

        const currentState =  getState();
        const market = currentState.market;

        const searchResults = await fetchWrapper(`https://api.spotify.com/v1/search?q=${query}&type=artist,album,playlist&market=${market}`, token);  
        
        const searchResultsObject = {
            artists: formatArtistSearchResults(searchResults.artists.items),
            albums: formatAlbumSearchResults(searchResults.albums.items),
            playlists: formatPlaylistSearchResults(searchResults.playlists.items)
        }

        dispatch(receiveSearchResults(searchResultsObject));
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


function formatArtistSearchResults(data) {
    return data.map(artist => {
        return {
            artistName: artist.name,
            artistID: artist.id,
            artistImage: artist.images.length ? artist.images[0].url : ''
        };
    });
}

function formatAlbumSearchResults(data) {
    return data.map(album => {
        return {
            artistName: album.artists[0].name,
            artistID: album.artists[0].id,
            albumName: album.name,
            albumID: album.id,
            albumImage: album.images.length ? album.images[0].url : ''
        }
    })
}

function formatPlaylistSearchResults(data) {
    return data.map(playlist => {
        return {
            ownerName: playlist.owner.display_name,
            ownerID: playlist.owner.id,
            playlistName: playlist.name,
            playlistID: playlist.id,
            playlistImage: playlist.images.length ? playlist.images[0].url : ''
        };
    });
}




