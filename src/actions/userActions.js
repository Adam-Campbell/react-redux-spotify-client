import * as ActionTypes from '../actiontypes';
import { convertMsToMinSec, fetchWrapper, dummyImageArray } from '../helpers';
import { errorModalOpen } from './modalActions';
import { saveMarketToLocalStorage } from '../helpers'; 

//
// Helper / formatting functions 
//

const formatUsersTopArtists = data => (
    data.items.map(artist => ({
        artistName: artist.name,
        artistID: artist.id,
        artistImage: artist.images.length ? artist.images : dummyImageArray   
    }))
    .slice(0, 10)
);

const formatUsersSavedPlaylists = data => (
    data.items.map(playlist => ({
        playlistName: playlist.name,
        playlistImage: playlist.images.length ? playlist.images : dummyImageArray,
        playlistID: playlist.id,
        ownerID: playlist.owner.id
    }))
);

const formatUsersRecentTracks = data => (
    data.items.map(curr => ({
        trackID: curr.track.id,
        trackName: curr.track.name,
        trackURI: curr.track.uri,
        duration: convertMsToMinSec(curr.track.duration_ms),
        previewURL: curr.track.preview_url,
        artistName: curr.track.artists[0].name,
        artistID: curr.track.artists[0].id,
        albumName: curr.track.album.name,
        albumID: curr.track.album.id,
        albumImage: curr.track.album.images.length ? curr.track.album.images : dummyImageArray,
        identifier: 'userRecentTracks'
    }))
    .filter((el, index, arr) => arr.findIndex(elem => elem.trackID === el.trackID) === index)
    .slice(0,5)
);


//
// Actions
//

const requestUser = () => ({
    type: ActionTypes.FETCH_USER_REQUEST
});

const receiveUser = userObject => ({
    type: ActionTypes.FETCH_USER_SUCCESS,
    payload: userObject
});


export const setMarket = market => ({
    type: ActionTypes.SET_MARKET,
    payload: market
});

export const fetchUserProfile = token => async dispatch => {
    dispatch(requestUser());
    try {
        const userInfo = fetchWrapper('https://api.spotify.com/v1/me', token);
        const usersTopArtists = fetchWrapper('https://api.spotify.com/v1/me/top/artists', token);
        const usersSavedPlaylists = fetchWrapper('https://api.spotify.com/v1/me/playlists', token);
        const usersRecentTracks = fetchWrapper('https://api.spotify.com/v1/me/player/recently-played', token);
        
        const userInfoComplete = await userInfo;
        const usersTopArtistsComplete = await usersTopArtists;
        const usersSavedPlaylistsComplete = await usersSavedPlaylists;
        const usersRecentTracksComplete = await usersRecentTracks;
        const userObject = {
            userName: userInfoComplete.display_name,
            userID: userInfoComplete.id,
            userImage: (userInfoComplete.images.length) ? userInfoComplete.images[0].url : '',
            topArtists: formatUsersTopArtists(usersTopArtistsComplete),
            playlists: formatUsersSavedPlaylists(usersSavedPlaylistsComplete),
            recentTracks: formatUsersRecentTracks(usersRecentTracksComplete)
        };
        dispatch(receiveUser(userObject));
        dispatch(setMarket(userInfoComplete.country));
        saveMarketToLocalStorage(userInfoComplete.country);
    } catch(e) { 
        dispatch(errorModalOpen(e));
    }
};











































// //
// // Exported thunk action
// //

// export function fetchUserProfile(token) {
//     return async function(dispatch) {
//         // dispatch initial event
//         dispatch(requestUser());
//         try {
//             // initiate the API calls for all the data we will need - in parellel
//             const userInfo = genericFetchWrapper('https://api.spotify.com/v1/me', token);
//             const usersTopTracks = genericFetchWrapper('https://api.spotify.com/v1/me/top/tracks', token);
//             const usersTopArtists = genericFetchWrapper('https://api.spotify.com/v1/me/top/artists', token);
//             const usersSavedPlaylists = genericFetchWrapper('https://api.spotify.com/v1/me/playlists', token);
//             const usersRecentTracks = genericFetchWrapper('https://api.spotify.com/v1/me/player/recently-played', token);
            
//             //ensure we await all of the API calls before resuming
//             const userInfoComplete = await userInfo;
//             const usersTopTracksComplete = await usersTopTracks;
//             const usersTopArtistsComplete = await usersTopArtists;
//             const usersSavedPlaylistsComplete = await usersSavedPlaylists;
//             const usersRecentTracksComplete = await usersRecentTracks;
        
//             const userObject = {
//                 userName: userInfoComplete.display_name,
//                 userID: userInfoComplete.id,
//                 userImage: (userInfoComplete.images.length) ? userInfoComplete.images[0].url : '',
//                 topTracks: formatUsersTopTracks(usersTopTracksComplete),
//                 topArtists: formatUsersTopArtists(usersTopArtistsComplete),
//                 playlists: formatUsersSavedPlaylists(usersSavedPlaylistsComplete),
//                 recentTracks: formatUsersRecentTracks(usersRecentTracksComplete)
//             };
//             dispatch(receiveUser(userObject));
//             dispatch(setMarket(userInfoComplete.country));
//         } catch(e) { 
//             dispatch(errorModalOpen(e));
//         }
//     }
// }



// //
// // Other actions called by thunk (not exported)
// //

// function requestUser() {
//     return {
//         type: ActionTypes.FETCH_USER_REQUEST
//     }
// }

// function receiveUser(userObject) {
//     return {
//         type: ActionTypes.FETCH_USER_SUCCESS,
//         payload: userObject
//     }
// }


// function setMarket(market) {
//     return {
//         type: ActionTypes.SET_MARKET,
//         payload: market
//     };
// }



// //
// // Helper functions 
// //

// function formatUsersTopTracks(data) {
//     return data.items.map(track => {
//         return {
//             trackID: track.id,
//             trackName: track.name,
//             trackURI: track.uri,
//             duration: convertMsToMinSec(track.duration_ms),
//             previewURL: track.preview_url,
//             artistName: track.artists[0].name,
//             artistID: track.artists[0].id,
//             albumName: track.album.name,
//             albumID: track.album.id,
//             albumImage: track.album.images.length ? track.album.images : dummyImageArray,
//             isCurrentlySelected: false,
//             isPlaying: false,
//         }
//     });
// }

// function formatUsersTopArtists(data) {
//     return data.items.map(artist => {
//         return {
//             artistName: artist.name,
//             artistID: artist.id,
//             artistImage: artist.images.length ? artist.images : dummyImageArray
//         }
//     }).slice(0, 10)
// }

// function formatUsersSavedPlaylists(data) {
//     return data.items.map(playlist => {
//         return {
//             playlistName: playlist.name,
//             playlistImage: playlist.images.length ? playlist.images : dummyImageArray,
//             playlistID: playlist.id,
//             ownerID: playlist.owner.id
//         }
//     })
// }


// function formatUsersRecentTracks(data) {
//     let unfiltered = data.items.map(curr => {
//         return {
//             trackID: curr.track.id,
//             trackName: curr.track.name,
//             trackURI: curr.track.uri,
//             duration: convertMsToMinSec(curr.track.duration_ms),
//             previewURL: curr.track.preview_url,
//             artistName: curr.track.artists[0].name,
//             artistID: curr.track.artists[0].id,
//             albumName: curr.track.album.name,
//             albumID: curr.track.album.id,
//             albumImage: curr.track.album.images.length ? curr.track.album.images : dummyImageArray,
//             isCurrentlySelected: false,
//             isPlaying: false,
//             identifier: 'userRecentTracks'
//         }
//     })
//     return unfiltered.filter((el, index, arr) => {
//         return (arr.findIndex(elem => elem.trackID === el.trackID) === index);
//     }).slice(0,5)
// }
