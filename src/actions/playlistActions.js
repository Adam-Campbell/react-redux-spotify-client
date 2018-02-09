import * as ActionTypes from '../actiontypes';
import { convertMsToMinSec, fetchWrapper } from './helpers';


//
// Exported thunk action
//

export function fetchPlaylist(token, playlistID, userID) {
    return async function(dispatch, getState) {
        dispatch(requestPlaylist());

        // get the market value from state to allow track relinking
        const currentState = getState();
        const market = currentState.market;

        // fetch playlistInfo
        const playlistInfo = await fetchWrapper(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}?market=${market}`, token);
        const total = playlistInfo.tracks.total;
        // save the first 100 tracks from the initial fetch
        const initialTracks = [...formatTrack(playlistInfo.tracks.items, playlistID)];
        // save the additionalTracks, if there are any - otherwise returns an empty array
        const additionalTracks = await fetchAdditionalTracks(total, userID, playlistID, market, token);

        // turn all the data collected into playlistObject
        const playlistObject = {
            ...formatPlaylistInfo(playlistInfo),
            playlistTracks: [
                ...initialTracks, 
                ...additionalTracks
            ]
        };

        dispatch(receivePlaylist(playlistObject, playlistID));
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


async function fetchAdditionalTracks(total, userID, playlistID, market, token) {
    const tempTracksArray = [];
    const promiseArray = [];
    let offset = 100;
    return new Promise(
        async (resolve, reject) => {
            while (offset < total) {
                const req = fetchWrapper(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks?market=${market}&limit=100&offset=${offset}`, token);
                promiseArray.push(req);
                offset += 100;
            }
            
            await Promise.all(promiseArray);
            
            promiseArray.forEach(prom => {
                prom.then(data => tempTracksArray.push(...formatTrack(data.items, playlistID)));
            });
            resolve(tempTracksArray);
        }
    );
}


function formatPlaylistInfo(data) {
    return {
        playlistName: data.name,
        playlistID: data.id,
        playlistImage: (data.images.length) ? data.images[0].url : '',
        ownerID: data.owner.id,
        ownerName: data.owner.display_name
    }
}


function formatTrack(data, playlistID) {
    return data.map(track => {
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
            identifier: playlistID
        };
    });
}
