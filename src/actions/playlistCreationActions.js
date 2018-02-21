import * as ActionTypes from '../actiontypes';
import { newFetchWrapper } from './helpers';
import { errorModalOpen } from './modalActions';


//
// Main exported thunk
//

export function createPlaylist(newPlaylistName) {
    return async function (dispatch, getState) {
        
        const currentState = getState();
        const token = currentState.accessToken;
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
            const createPlaylistResponse = await newFetchWrapper(url, settings);
            const playlistObject = createPlaylistObject(createPlaylistResponse);
            dispatch(createPlaylistSuccess(playlistObject));
        } catch(e) {
            dispatch(errorModalOpen(e)); 
        }

    }
}



//
// Actions dispatched by thunk
//

function createPlaylistSuccess(playlist) {
    return {
        type: ActionTypes.CREATE_PLAYLIST_SUCCESS,
        payload: playlist
    }   
}



//
// Helper functions
//

function createPlaylistObject(data) {
    return {
        playlistName: data.name,
        playlistID: data.id,
        ownerID: data.owner.id,
        playlistImage: ''
    };
}