import * as ActionTypes from '../actiontypes';
import { fetchWrapper, dummyImageArray } from '../helpers';
import { errorModalOpen } from './modalActions';


//
// Helper / formatting functions 
//

const formatCategory = data => (
    data.map(playlist => ({
        playlistID: playlist.id,
        playlistName: playlist.name,
        playlistImage: playlist.images.length ? playlist.images : dummyImageArray,
        ownerID: playlist.owner.id
    }))
);


//
// Actions
//

const requestCategory = () => ({
    type: ActionTypes.FETCH_CATEGORY_REQUEST
});

const receiveCategory = (playlistArray, id) => ({
    type: ActionTypes.FETCH_CATEGORY_SUCCESS,
    payload: {
        playlistArray: playlistArray,
        id: id
    }
});

export const fetchCategory = (token, id) => async dispatch => {
    dispatch(requestCategory());
    try {
        const categoryInfo = await fetchWrapper(`https://api.spotify.com/v1/browse/categories/${id}/playlists`, token);
        const category = formatCategory(categoryInfo.playlists.items);  
        dispatch(receiveCategory(category, id));
    } catch(e) {
        dispatch(errorModalOpen(e));
    }
};





















//
// Exported thunk action
//

// export function fetchCategory(token, id) {
//     return async function(dispatch) {
//         dispatch(requestCategory());
//         try {
//             const categoryInfo = await genericFetchWrapper(`https://api.spotify.com/v1/browse/categories/${id}/playlists`, token);
//             const category = formatCategory(categoryInfo.playlists.items);  
//             dispatch(receiveCategory(category, id));
//         } catch(e) {
//             dispatch(errorModalOpen(e));
//         }
//     }
// }


// //
// // Other actions called by thunk (not exported)
// //

// function requestCategory() {
//     return {
//         type: ActionTypes.FETCH_CATEGORY_REQUEST
//     }
// }

// function receiveCategory(playlistArray, id) {
//     return {
//         type: ActionTypes.FETCH_CATEGORY_SUCCESS,
//         payload: {
//             playlistArray: playlistArray,
//             id: id
//         }
//     }
// }


// //
// // Helper functions 
// //

// function formatCategory(arr) {
//     return arr.map(playlist => {
//         return {
//             playlistID: playlist.id,
//             playlistName: playlist.name,
//             playlistImage: playlist.images.length ? playlist.images : dummyImageArray,
//             ownerID: playlist.owner.id
//         }
//     })
// }


