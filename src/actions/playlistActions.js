import * as ActionTypes from '../actiontypes';
import { convertMsToMinSec } from './helpers';


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




export function fetchPlaylist(token, playlistID, userID) {
    return async function(dispatch) {
        dispatch(requestPlaylist())
        
        const playlistInfo = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}?access_token=${token}`);
        const playlistInfoJSON = await playlistInfo.json();
        
        const playlistObject = {
            playlistName: playlistInfoJSON.name,
            playlistID: playlistInfoJSON.id,
            playlistImage: (playlistInfoJSON.images.length) ? playlistInfoJSON.images[0].url : '',
            ownerID: playlistInfoJSON.owner.id,
            ownerName: playlistInfoJSON.owner.display_name,
            playlistTracks: playlistInfoJSON.tracks.items.map(track => {
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
                    identifier: playlistInfoJSON.id
                };
            })
        };




        dispatch(receivePlaylist(playlistObject, playlistID))
    }

}
