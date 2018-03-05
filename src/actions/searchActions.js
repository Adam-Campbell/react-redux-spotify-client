import * as ActionTypes from '../actiontypes';
import { fetchWrapper, dummyImageArray } from '../helpers';
import { errorModalOpen } from './modalActions';


//
// Helper / formatting functions 
//

const formatArtistSearchResults = data => (
    data.map(artist => ({
        artistName: artist.name,
        artistID: artist.id,
        artistImage: artist.images.length ? artist.images : dummyImageArray
    }))
);

const formatAlbumSearchResults = data => (
    data.map(album => ({
        artistName: album.artists[0].name,
        artistID: album.artists[0].id,
        albumName: album.name,
        albumID: album.id,
        albumImage: album.images.length ? album.images : dummyImageArray
    }))
);

const formatPlaylistSearchResults = data => (
    data.map(playlist => ({
        ownerName: playlist.owner.display_name,
        ownerID: playlist.owner.id,
        playlistName: playlist.name,
        playlistID: playlist.id,
        playlistImage: playlist.images.length ? playlist.images : dummyImageArray
    }))
);


//
// Actions
//

const requestSearchResults = () => ({
    type: ActionTypes.FETCH_SEARCH_RESULTS_REQUEST
});

const receiveSearchResults = results => ({
    type: ActionTypes.FETCH_SEARCH_RESULTS_SUCCESS,
    payload: results
});

export const updateSearch = search => ({
    type: ActionTypes.UPDATE_SEARCH,
    payload: search
});

export const fetchSearchResults = (query, token) => async (dispatch, getState) => {
    dispatch(requestSearchResults());

    const currentState =  getState();
    const market = currentState.market;

    try {
        const searchResults = await fetchWrapper(`https://api.spotify.com/v1/search?q=${query}&type=artist,album,playlist&market=${market}`, token);  
        
        const searchResultsObject = {
            artists: formatArtistSearchResults(searchResults.artists.items),
            albums: formatAlbumSearchResults(searchResults.albums.items),
            playlists: formatPlaylistSearchResults(searchResults.playlists.items)
        }

        dispatch(receiveSearchResults(searchResultsObject));
    } catch(e) {
        dispatch(errorModalOpen(e));
        // This throws an error if you try to search without a search query. 
        // So either I need custom error handling in here that ignores that specific
        // type of error, or I need to alter the component so that it only dispatches
        // the action when there is a search query present - this is probably the better
        // solution.
    }
};





















































// //
// // Exported thunk action
// //

// export function fetchSearchResults(query, token) {
//     return async function(dispatch, getState) {

//         dispatch(requestSearchResults());

//         const currentState =  getState();
//         const market = currentState.market;

//         try {
//             const searchResults = await genericFetchWrapper(`https://api.spotify.com/v1/search?q=${query}&type=artist,album,playlist&market=${market}`, token);  
            
//             const searchResultsObject = {
//                 artists: formatArtistSearchResults(searchResults.artists.items),
//                 albums: formatAlbumSearchResults(searchResults.albums.items),
//                 playlists: formatPlaylistSearchResults(searchResults.playlists.items)
//             }

//             dispatch(receiveSearchResults(searchResultsObject));
//         } catch(e) {
//             dispatch(errorModalOpen(e));
//             // This throws an error if you try to search without a search query. 
//             // So either I need custom error handling in here that ignores that specific
//             // type of error, or I need to alter the component so that it only dispatches
//             // the action when there is a search query present - this is probably the better
//             // solution.
//         }
//     }
// }


// //
// // Other actions 
// //

// export function updateSearch(search) {
//     return {
//         type: ActionTypes.UPDATE_SEARCH,
//         payload: search
//     }
// }

// function requestSearchResults() {
//     return {
//         type: ActionTypes.FETCH_SEARCH_RESULTS_REQUEST
//     }
// }

// function receiveSearchResults(results) {
//     return {
//         type: ActionTypes.FETCH_SEARCH_RESULTS_SUCCESS,
//         payload: results
//     }
// }


// //
// // Helper functions 
// //

// function formatArtistSearchResults(data) {
//     return data.map(artist => {
//         return {
//             artistName: artist.name,
//             artistID: artist.id,
//             artistImage: artist.images.length ? artist.images : dummyImageArray
//         };
//     });
// }

// function formatAlbumSearchResults(data) {
//     return data.map(album => {
//         return {
//             artistName: album.artists[0].name,
//             artistID: album.artists[0].id,
//             albumName: album.name,
//             albumID: album.id,
//             albumImage: album.images.length ? album.images : dummyImageArray
//         }
//     })
// }

// function formatPlaylistSearchResults(data) {
//     return data.map(playlist => {
//         return {
//             ownerName: playlist.owner.display_name,
//             ownerID: playlist.owner.id,
//             playlistName: playlist.name,
//             playlistID: playlist.id,
//             playlistImage: playlist.images.length ? playlist.images : dummyImageArray
//         };
//     });
// }




