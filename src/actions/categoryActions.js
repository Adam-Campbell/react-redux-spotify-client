import * as ActionTypes from '../actiontypes';
import { fetchWrapper } from './helpers';


//
// Exported thunk action
//

export function fetchCategory(token, id) {
    return async function(dispatch) {
        dispatch(requestCategory());
        const categoryInfo = await fetchWrapper(`https://api.spotify.com/v1/browse/categories/${id}/playlists`, token);
        const category = formatCategory(categoryInfo.playlists.items);  

        dispatch(receiveCategory(category, id));
    }
}


//
// Other actions called by thunk (not exported)
//

function requestCategory() {
    return {
        type: ActionTypes.FETCH_CATEGORY_REQUEST
    }
}

function receiveCategory(playlistArray, id) {
    return {
        type: ActionTypes.FETCH_CATEGORY_SUCCESS,
        payload: {
            playlistArray: playlistArray,
            id: id
        }
    }
}


//
// Helper functions 
//

function formatCategory(arr) {
    return arr.map(playlist => {
        return {
            playlistID: playlist.id,
            playlistName: playlist.name,
            playlistImage: (playlist.images.length) ? playlist.images[0].url : '',
            ownerID: playlist.owner.id
        }
    })
}





