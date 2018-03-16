import * as ActionTypes from '../actiontypes';
import { fetchWrapperWithSettings, placeholderMusicImageArray, saveUserInfoToLocalStorage } from '../helpers';
import { errorModalOpen } from './modalActions';


//
// Helper / formatting functions
//

const createPlaylistObject = data => ({
    playlistName: data.name,
    playlistID: data.id,
    ownerID: data.owner.id,
    playlistImage: placeholderMusicImageArray
});


//
// Actions
//

const createPlaylistSuccess = playlist => ({
    type: ActionTypes.CREATE_PLAYLIST_SUCCESS,
    payload: playlist
}); 

export const createPlaylist = newPlaylistName => async (dispatch, getState) => {
    const currentState = getState();
    const token = currentState.accessToken.token;
    const userID = currentState.userInfo.userID;
    const url = `https://api.spotify.com/v1/users/${userID}/playlists`;
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            "name": newPlaylistName
        })
    };
    
    try {
        const createPlaylistResponse = await fetchWrapperWithSettings(url, settings);
        const playlistObject = createPlaylistObject(createPlaylistResponse);
        dispatch(createPlaylistSuccess(playlistObject));
        saveUserInfoToLocalStorage({
            ...currentState.userInfo,
            playlists: [
                playlistObject,
                ...currentState.userInfo.playlists
            ]
        });
    } catch(e) {
        dispatch(errorModalOpen(e)); 
    }
};
