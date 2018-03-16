import * as ActionTypes from '../actiontypes';
import { fetchWrapperNoResponseBody, saveUserInfoToLocalStorage } from '../helpers';
import { errorModalOpen } from './modalActions';


//
// Actions 
//

const updatePlaylistImageSuccess = (imageURL, playlistID) => ({
    type: ActionTypes.UPDATE_PLAYLIST_IMAGE_SUCCESS,
    payload: {
        imageURL: imageURL,
        key: playlistID
    }
});

const updatePlaylistNameSuccess = (newName, playlistID) => ({
    type: ActionTypes.UPDATE_PLAYLIST_NAME_SUCCESS,
    payload: {
        newName: newName,
        key: playlistID
    }
});

export const updatePlaylistImage = (ownerID, playlistID, image, token) => async (dispatch, getState) => {
    const currentState = getState();
    const formattedImageURI = image.replace(/^data:image\/(jpeg|jpg|png);base64,/, '');
    const url = `https://api.spotify.com/v1/users/${ownerID}/playlists/${playlistID}/images`;
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'image/jpeg'
        },
        method: 'PUT',
        body: formattedImageURI 
    };

    try {
        const updateImageResponse = await fetchWrapperNoResponseBody(url, settings);
        dispatch(updatePlaylistImageSuccess(image, playlistID));
        saveUserInfoToLocalStorage({
            ...currentState.userInfo,
            playlists: currentState.userInfo.playlists.map(playlist => {
                return playlistID !== playlist.playlistID ?
                    playlist :
                    {
                        ...playlist,
                        playlistImage: [{ height: 1000, width: 1000, url: image }]
                    }
            })
        });
    } catch(e) {
        dispatch(errorModalOpen(e));
    }
};

export const updatePlaylistName = (ownerID, playlistID, newName, token) => async (dispatch, getState) => {
    const currentState = getState();

    const url = `https://api.spotify.com/v1/users/${ownerID}/playlists/${playlistID}`;
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
            "name": newName
        })
    };

    try {
        const updatePlaylistNameResponse = await fetchWrapperNoResponseBody(url, settings);
        dispatch(updatePlaylistNameSuccess(newName, playlistID));
        saveUserInfoToLocalStorage({
            ...currentState.userInfo,
            playlists: currentState.userInfo.playlists.map(playlist => {
                return playlistID !== playlist.playlistID ?
                        playlist :
                        {
                            ...playlist,
                            playlistName: newName
                        }
            })
        });
    } catch(e) {
        console.log(e);
    }
};







































