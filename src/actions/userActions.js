import * as ActionTypes from '../actiontypes';
import { convertMsToMinSec } from './helpers';



function requestUser() {
    return {
        type: ActionTypes.FETCH_USER_REQUEST
    }
}

function receiveUser(userObject) {
    return {
        type: ActionTypes.FETCH_USER_SUCCESS,
        payload: userObject
    }
}


function noParamFetch(url, token) {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    const init = {
        headers
    };
    return fetch(url, init);
}

function formatUsersTopTracks(data) {
    return data.items.map(track => {
        return {
            trackID: track.id,
            trackName: track.name,
            duration: convertMsToMinSec(track.duration_ms),
            previewURL: track.preview_url,
            artistName: track.artists[0].name,
            artistID: track.artists[0].id,
            albumName: track.album.name,
            albumID: track.album.id,
            albumImage: (track.album.images.length) ? track.album.images[0].url : '',
            isCurrentlySelected: false,
            isPlaying: false,
            context: {
                location: 'userTopTracks'
            }
        }
    });
}

function formatUsersTopArtists(data) {
    return data.items.map(artist => {
        return {
            artistName: artist.name,
            artistID: artist.id,
            artistImage: (artist.images.length) ? artist.images[0].url : ''
        }
    }).slice(0, 10)
}

function formatUsersSavedPlaylists(data) {
    return data.items.map(playlist => {
        return {
            playlistName: playlist.name,
            playlistImage: (playlist.images.length) ? playlist.images[0].url : '',
            playlistID: playlist.id,
            ownerID: playlist.owner.id
        }
    })
}


function formatUsersRecentTracks(data) {
    let unfiltered = data.items.map(curr => {
        return {
            trackID: curr.track.id,
            trackName: curr.track.name,
            duration: convertMsToMinSec(curr.track.duration_ms),
            previewURL: curr.track.preview_url,
            artistName: curr.track.artists[0].name,
            artistID: curr.track.artists[0].id,
            albumName: curr.track.album.name,
            albumID: curr.track.album.id,
            albumImage: (curr.track.album.images.length) ? curr.track.album.images[0].url : '',
            isCurrentlySelected: false,
            isPlaying: false,
            identifier: 'userRecentTracks'
        }
    })
    return unfiltered.filter((el, index, arr) => {
        return (arr.findIndex(elem => elem.trackID === el.trackID) === index);
    }).slice(0,5)
    
}


export function fetchUserProfile(token) {
    return async function(dispatch) {
        dispatch(requestUser());
        const userObject = {};
        // async magic here

        const userInfo = noParamFetch('https://api.spotify.com/v1/me', token);
        const usersTopTracks = noParamFetch('https://api.spotify.com/v1/me/top/tracks', token);
        const usersTopArtists = noParamFetch('https://api.spotify.com/v1/me/top/artists', token);
        const usersSavedPlaylists = noParamFetch('https://api.spotify.com/v1/me/playlists', token);
        const usersRecentTracks = noParamFetch('https://api.spotify.com/v1/me/player/recently-played', token);

        const userInfoComplete = await userInfo;
        const userInfoJSON = await userInfoComplete.json();
        userObject.userName = userInfoJSON.display_name;
        userObject.userID = userInfoJSON.id;
        userObject.userImage = (userInfoJSON.images.length) ? userInfoJSON.images[0].url : '';

        const usersTopTracksComplete = await usersTopTracks;
        const usersTopTracksJSON = await usersTopTracksComplete.json();
        userObject.topTracks = formatUsersTopTracks(usersTopTracksJSON);

        const usersTopArtistsComplete = await usersTopArtists;
        const usersTopArtistsJSON = await usersTopArtistsComplete.json();
        userObject.topArtists = formatUsersTopArtists(usersTopArtistsJSON);

        const usersSavedPlaylistsComplete = await usersSavedPlaylists;
        const usersSavedPlaylistsJSON = await usersSavedPlaylistsComplete.json();
        userObject.playlists = formatUsersSavedPlaylists(usersSavedPlaylistsJSON);

        const usersRecentTracksComplete = await usersRecentTracks;
        const usersRecentTracksJSON = await usersRecentTracksComplete.json();
        userObject.recentTracks = formatUsersRecentTracks(usersRecentTracksJSON);

        // then dispatch it when done
        dispatch(receiveUser(userObject));


    }
}
