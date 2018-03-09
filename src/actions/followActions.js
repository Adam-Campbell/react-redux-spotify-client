import * as ActionTypes from '../actiontypes';
import { fetchWrapperWithSettingsNoResponseBody } from '../helpers';
import { errorModalOpen } from './modalActions';


//
// Artist follow / unfollow actions
//


const followArtistRequest = () => ({
    type: ActionTypes.FOLLOW_ARTIST_REQUEST
});

const followArtistSuccess = artistID => ({
    type: ActionTypes.FOLLOW_ARTIST_SUCCESS,
    payload: artistID
});

const unfollowArtistRequest = () => ({
    type: ActionTypes.UNFOLLOW_ARTIST_REQUEST
});

const unfollowArtistSuccess = artistID => ({
    type: ActionTypes.UNFOLLOW_ARTIST_SUCCESS,
    payload: artistID
});

export const followArtist = (artistID, token) => async dispatch => {
    dispatch(followArtistRequest());
    const url = 'https://api.spotify.com/v1/me/following?type=artist';
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
            ids: [
                artistID
            ]
        })
    };
    try {
        const hasFollowed = await fetchWrapperWithSettingsNoResponseBody(url, settings);
        dispatch(followArtistSuccess(artistID));
    } catch(e) {
        console.log(e);
        dispatch(errorModalOpen(e));
    }
}


export const unfollowArtist = (artistID, token) => async dispatch => {
    dispatch(unfollowArtistRequest());
    const url = 'https://api.spotify.com/v1/me/following?type=artist';
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({
            ids: [
                artistID
            ]
        })
    };
    try {
        const hasUnfollowed = await fetchWrapperWithSettingsNoResponseBody(url, settings);
        dispatch(unfollowArtistSuccess(artistID));
    } catch(e) {
        console.log(e);
        dispatch(errorModalOpen(e));
    }
}


//
// Playlist follow / unfollow actions
//


const followPlaylistRequest = () => ({
    type: ActionTypes.FOLLOW_PLAYLIST_REQUEST
});

const followPlaylistSuccess = (playlistID, playlistObject) => ({
    type: ActionTypes.FOLLOW_PLAYLIST_SUCCESS,
    payload: {
        key: playlistID,
        playlistObject: playlistObject
    }
});

const unfollowPlaylistRequest = () => ({
    type: ActionTypes.UNFOLLOW_PLAYLIST_REQUEST
});

const unfollowPlaylistSuccess = playlistID => ({
    type: ActionTypes.UNFOLLOW_PLAYLIST_SUCCESS,
    payload: playlistID
});


export const followPlaylist = (playlistID, ownerID, token) => async (dispatch, getState) => {
    const currentState = getState();
    const thisPlaylist = currentState.playlists.playlistData[playlistID];
    
    dispatch(followPlaylistRequest());
    const url = `https://api.spotify.com/v1/users/${ownerID}/playlists/${playlistID}/followers`;
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'PUT'
    };
    try {
        const hasFollowed = await fetchWrapperWithSettingsNoResponseBody(url, settings);
        const playlistObject = {
            playlistName: thisPlaylist.playlistName,
            playlistImage: thisPlaylist.playlistImage,
            playlistID: thisPlaylist.playlistID,
            ownerID: thisPlaylist.ownerID,
        };
        dispatch(followPlaylistSuccess(playlistID, playlistObject));
    } catch(e) {
        console.log(e);
        dispatch(errorModalOpen(e));
    }
}


export const unfollowPlaylist = (playlistID, ownerID, token) => async dispatch => {
    dispatch(unfollowPlaylistRequest());
    const url = `https://api.spotify.com/v1/users/${ownerID}/playlists/${playlistID}/followers`;
    const settings = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    };
    try {
        const hasUnfollowed = await fetchWrapperWithSettingsNoResponseBody(url, settings);
        dispatch(unfollowPlaylistSuccess(playlistID));
    } catch(e) {
        console.log(e);
        dispatch(errorModalOpen(e));
    }
}