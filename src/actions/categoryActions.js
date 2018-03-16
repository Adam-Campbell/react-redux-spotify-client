import * as ActionTypes from '../actiontypes';
import { fetchWrapper, placeholderMusicImageArray } from '../helpers';
import { errorModalOpen } from './modalActions';


//
// Helper / formatting functions 
//

const formatCategory = data => (
    data.map(playlist => ({
        playlistID: playlist.id,
        playlistName: playlist.name,
        playlistImage: playlist.images.length ? playlist.images : placeholderMusicImageArray,
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
