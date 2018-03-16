import * as ActionTypes from '../actiontypes';
import { fetchWrapperNoResponseBody } from '../helpers';
import { errorModalOpen } from './modalActions';

//
// Actions
//

const deleteTrackFromPlaylistSuccess = (playlistID, index) => ({
    type: ActionTypes.DELETE_TRACK_FROM_PLAYLIST_SUCCESS,
    payload: {
        key: playlistID,
        index: index
    }
});

const addTrackToPlaylistSuccess = (track, playlistID) => ({
    type: ActionTypes.ADD_TRACK_TO_PLAYLIST_SUCCESS,
    payload: {
        key: playlistID,
        track: track
    }
});

export const deleteTrackFromPlaylist = (ownerID, playlistID, trackURI, index, token) => async dispatch => {
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
        const deleteTrackResponse = await fetchWrapperNoResponseBody(url, settings);
        dispatch(deleteTrackFromPlaylistSuccess(playlistID, index));
    } catch(e) {
        dispatch(errorModalOpen(e));
    }
};

export const addTrackToPlaylist = (ownerID, playlistID, trackToAdd, token) => async (dispatch, getState) => {
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
        const addTrackResponse = await fetchWrapperNoResponseBody(url, settings);
        if (playlists[playlistID]) {
            dispatch(addTrackToPlaylistSuccess(trackToAdd, playlistID));
        }
    } catch(e) {
        console.log(e);
    } 
};
