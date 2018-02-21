import * as ActionTypes from '../actiontypes';
import { noResponseFetchWrapper } from './helpers';
import { errorModalOpen } from './modalActions';


//
// Main exported thunks
//

export function updatePlaylistImage(ownerID, playlistID, image, token) {
    return async function(dispatch) {

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
            const updateImageResponse = await noResponseFetchWrapper(url, settings);
            dispatch(updatePlaylistImageSuccess(image, playlistID));
        } catch(e) {
            dispatch(errorModalOpen(e));
        }
    }
}


export function updatePlaylistName(ownerID, playlistID, newName, token) {
    return async function(dispatch) {

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
            const updatePlaylistNameResponse = await noResponseFetchWrapper(url, settings);
            dispatch(updatePlaylistNameSuccess(newName, playlistID));
        } catch(e) {
            console.log(e);
        }
    }
}


//
// Actions dispatched by thunks
//

function updatePlaylistImageSuccess(imageURL, playlistID) {
    return {
        type: ActionTypes.UPDATE_PLAYLIST_IMAGE_SUCCESS,
        payload: {
            imageURL: imageURL,
            key: playlistID
        }
    }
}

function updatePlaylistNameSuccess(newName, playlistID) {
    return {
        type: ActionTypes.UPDATE_PLAYLIST_NAME_SUCCESS,
        payload: {
            newName: newName,
            key: playlistID
        }
    }
}






































