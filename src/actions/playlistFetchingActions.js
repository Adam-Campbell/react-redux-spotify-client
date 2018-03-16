import * as ActionTypes from '../actiontypes';
import { convertMsToMinSec, fetchWrapper, placeholderMusicImageArray } from '../helpers';
import { errorModalOpen } from './modalActions';
import { formatUsersSavedPlaylists } from './userActions';

//
// Helper / formatting functions
//

const formatPlaylistInfo = data => ({
    playlistName: data.name,
    playlistID: data.id,
    playlistImage: data.images.length ? data.images : placeholderMusicImageArray,
    ownerID: data.owner.id,
    ownerName: data.owner.display_name,
    followers: data.followers.total
});

const formatTrack = (data, playlistID) => (
    data.map(track => ({
        trackID: track.track.id,
        trackName: track.track.name,
        previewURL: track.track.preview_url,
        duration: convertMsToMinSec(track.track.duration_ms),
        artistName: track.track.artists[0].name,
        artistID: track.track.artists[0].id,
        albumName: track.track.album.name,
        albumID: track.track.album.id,
        albumImage: track.track.album.images.length ? track.track.album.images : placeholderMusicImageArray,
        isPlaying: false,
        isCurrentlySelected: false,
        identifier: playlistID,
        trackURI: track.track.uri
    }))
);

const fetchAdditionalTracks = async (total, userID, playlistID, market, token) => {
    const tempTracksArray = [];
    const promiseArray = [];
    let offset = 100;
    
    try {
        while (offset < total) {
            const req = fetchWrapper(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks?market=${market}&limit=100&offset=${offset}`, token);
            promiseArray.push(req);
            offset += 100;
        }
        
        await Promise.all(promiseArray);
        
        promiseArray.forEach(prom => {
            prom.then(data => tempTracksArray.push(...formatTrack(data.items, playlistID)));
        });
        return tempTracksArray;
        
    } catch(e) {
        return Promise.reject(e);
    }
}


//
// Actions 
//

const requestPlaylist = () => ({
    type: ActionTypes.FETCH_PLAYLIST_REQUEST
});

const receivePlaylist = (playlistObject, id) => ({
    type: ActionTypes.FETCH_PLAYLIST_SUCCESS,
    payload: {
        playlistObject: playlistObject,
        key: id
    }
});

const fetchAndReturnCurrentUserID = async token => {
    const currentUserInfo = await fetchWrapper('https://api.spotify.com/v1/me', token);
    return currentUserInfo.id;
}


export const fetchPlaylist = (token, playlistID, userID) => async (dispatch, getState) => {
    dispatch(requestPlaylist());

    // get the market value from state to allow track relinking
    const currentState = getState();
    const market = currentState.userInfo.market;
    const currentUserID = currentState.userInfo.userID;
    
    try {
        // fetch playlistInfo
        const playlistInfo = await fetchWrapper(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}?market=${market}`, token);
        const checkIfFollowing = await fetchWrapper(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/followers/contains?ids=${currentUserID}`, token);
        const total = playlistInfo.tracks.total;
        // save the first 100 tracks from the initial fetch
        const initialTracks = [...formatTrack(playlistInfo.tracks.items, playlistID)];
        // save the additionalTracks, if there are any - otherwise returns an empty array
        const additionalTracks = await fetchAdditionalTracks(total, userID, playlistID, market, token);

        // turn all the data collected into playlistObject
        const playlistObject = {
            ...formatPlaylistInfo(playlistInfo),
            isFollowing: checkIfFollowing[0],
            playlistTracks: [
                ...initialTracks, 
                ...additionalTracks
            ]
        };
        dispatch(receivePlaylist(playlistObject, playlistID));
        
    } catch(e) {
        dispatch(errorModalOpen(e));
    }
};
