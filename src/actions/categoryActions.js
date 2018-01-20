import * as ActionTypes from '../actiontypes';


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



export function fetchCategory(token, id) {
    return async function(dispatch) {
        dispatch(requestCategory());
        const getCategory = await fetch(`https://api.spotify.com/v1/browse/categories/${id}/playlists?access_token=${token}`);
        const getCategoryJSON = await getCategory.json();

        const category = formatCategory(getCategoryJSON.playlists.items);        
        dispatch(receiveCategory(category, id));
    }
}

