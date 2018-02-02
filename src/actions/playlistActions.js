import * as ActionTypes from '../actiontypes';
import { convertMsToMinSec, fetchWrapper } from './helpers';


//
// Exported thunk action
//

export function fetchPlaylist(token, playlistID, userID) {
    return async function(dispatch, getState) {
        dispatch(requestPlaylist())

        const currentState =  getState();
        const market = currentState.market;
        
        const playlistInfo = await fetchWrapper(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}?market=${market}`, token);
        const playlistObject = formatPlaylist(playlistInfo);

        dispatch(receivePlaylist(playlistObject, playlistID))
    }

}


//
// Other actions called by thunk (not exported)
//

function requestPlaylist() {
    return {
        type: ActionTypes.FETCH_PLAYLIST_REQUEST
    }
}

function receivePlaylist(playlistObject, id) {
    return {
        type: ActionTypes.FETCH_PLAYLIST_SUCCESS,
        payload: {
            playlistObject: playlistObject,
            key: id
        }
    }
}


//
// Helper functions 
//

function formatPlaylist(data) {
    return {
        playlistName: data.name,
        playlistID: data.id,
        playlistImage: (data.images.length) ? data.images[0].url : '',
        ownerID: data.owner.id,
        ownerName: data.owner.display_name,
        playlistTracks: data.tracks.items.map(track => {
            return {
                trackID: track.track.id,
                trackName: track.track.name,
                previewURL: track.track.preview_url,
                duration: convertMsToMinSec(track.track.duration_ms),
                artistName: track.track.artists[0].name,
                artistID: track.track.artists[0].id,
                albumName: track.track.album.name,
                albumID: track.track.album.id,
                albumImage: (track.track.album.images.length) ? track.track.album.images[0].url : '',
                isPlaying: false,
                isCurrentlySelected: false,
                identifier: data.id
            };
        })
    }
}