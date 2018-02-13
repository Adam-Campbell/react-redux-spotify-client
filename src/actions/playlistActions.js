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
//  updatePlaylistImage function - should be a thunk
//  needs to be passed the ownerID, playlistID, and the image (base64 encoded).
//
//  calls the API endpoint with the info provided.
//  if endpoint comes back with error, just let the user know of the error.
//
//  if endpoint comes back with success, save the image in the local store. 
//
//

export function updatePlaylistImage(ownerID, playlistID, image, accessToken) {
    return async function(dispatch) {
        await postImage(ownerID, playlistID, image, accessToken);
        dispatch(updatePlaylistImageSuccess(image, playlistID));
    }
}

export function updatePlaylistName(ownerID, playlistID, newName, token) {
    return async function(dispatch) {
        await putPlaylistName(ownerID, playlistID, newName, token);
        dispatch(updatePlaylistNameSuccess(newName, playlistID));
    }
}


export function deleteTrackFromPlaylist(ownerID, playlistID, trackURI, index, token) {
    return async function(dispatch) {
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
        console.log(settings);
        await fetch(`https://api.spotify.com/v1/users/${ownerID}/playlists/${playlistID}/tracks`, settings);
        console.log(playlistID, index);
        dispatch(deleteTrackFromPlaylistSuccess(playlistID, index));
    }
}


export function addTrackToPlaylist(ownerID, playlistID, trackToAdd, token) {
    return async function(dispatch, getState) {
        const currentState = getState();
        const playlists = currentState.playlists.playlistData;
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
        await fetch(`https://api.spotify.com/v1/users/${ownerID}/playlists/${playlistID}/tracks`, settings);
        
        if (playlists[playlistID]) {
            dispatch(addTrackToPlaylistSuccess(trackToAdd, playlistID));
        }
    }
}

export function createPlaylist(newPlaylistName) {
    return async function(dispatch, getState) {
        
        const currentState = getState();
        const token = currentState.accessToken;
        const userID = currentState.userInfo.userID;

        const createPlaylistResponse = await createPlaylistRequest(newPlaylistName, userID, token);
        window.createPlaylistResponse = createPlaylistResponse;

        const playlistObject = {
            playlistName: createPlaylistResponse.name,
            playlistID: createPlaylistResponse.id,
            ownerID: createPlaylistResponse.owner.id,
            playlistImage: ''
        }

        dispatch(createPlaylistSuccess(playlistObject));
    } 
}

function createPlaylistRequest(newPlaylistName, userID, token) {
    return new Promise(
        (resolve, reject) => {
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
            fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, settings)
            .then(response => response.json())
            .then(response => resolve(response))
        }
    )
}

function createPlaylistSuccess(playlist) {
    return {
        type: ActionTypes.CREATE_PLAYLIST_SUCCESS,
        payload: playlist
    }   
}





async function putPlaylistName(ownerID, playlistID, newName, token) {
    return new Promise(
        async (resolve, reject) => {
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
            const newNameResponse = await fetch(`https://api.spotify.com/v1/users/${ownerID}/playlists/${playlistID}`, settings);
            resolve(newNameResponse);
        }
    )
}


async function postImage(ownerID, playlistID, image, token) {
    return new Promise(
        async (resolve, reject) => {
            const formattedImageURI = image.replace(/^data:image\/(jpeg|jpg|png);base64,/, '');
            const settings = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'image/jpeg'
                },
                method: 'PUT',
                body: formattedImageURI 
            };
            const imageResponse = await fetch(`https://api.spotify.com/v1/users/${ownerID}/playlists/${playlistID}/images`, settings);
            resolve(imageResponse);
        }
    );
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
            identifier: playlistID,
            trackURI: track.track.uri
        };
    });
}
