import * as ActionTypes from '../actiontypes';
import { noResponseFetchWrapper } from './helpers';
import { errorModalOpen } from './modalActions';

//
// Main exported thunks
//

export function deleteTrackFromPlaylist(ownerID, playlistID, trackURI, index, token) {
    return async function(dispatch) {
        const url = `https://api.spotify.com/v1/users/${ownerID}/playlists/${playlistID}/tracks`;
        const settings = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: JSON.stringify({
                "tracks": [
                    {
                        "uri": trackURI,
                        "positions": [index]
                    }
                ]
            })
        };

        try {
            const deleteTrackResponse = await noResponseFetchWrapper(url, settings);
            dispatch(deleteTrackFromPlaylistSuccess(playlistID, index));
        } catch(e) {
            dispatch(errorModalOpen(e));
        }
    }
}


export function addTrackToPlaylist(ownerID, playlistID, trackToAdd, token) {
    return async function(dispatch, getState) {
        const currentState = getState();
        const playlists = currentState.playlists.playlistData;

        const url = `https://api.spotify.com/v1/users/${ownerID}/playlists/${playlistID}/tracks`;
        const settings = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                "uris": [
                    trackToAdd.trackURI
                ]
            })
        };

        try {
            const addTrackResponse = await noResponseFetchWrapper(url, settings);
            if (playlists[playlistID]) {
                dispatch(addTrackToPlaylistSuccess(trackToAdd, playlistID));
            }
        } catch(e) {
            console.log(e);
        }
        
    }
}



//
// Actions dispatched by thunks
//

function deleteTrackFromPlaylistSuccess(playlistID, index) {
    return {
        type: ActionTypes.DELETE_TRACK_FROM_PLAYLIST_SUCCESS,
        payload: {
            key: playlistID,
            index: index
        }
    }
}


function addTrackToPlaylistSuccess(track, playlistID) {
    return {
        type: ActionTypes.ADD_TRACK_TO_PLAYLIST_SUCCESS,
        payload: {
            key: playlistID,
            track: track
        }
    }
}
