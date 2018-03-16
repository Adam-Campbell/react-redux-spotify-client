import * as ActionTypes from '../actiontypes';
import { 
    convertMsToMinSec, 
    fetchWrapper, 
    placeholderMusicImageArray, 
    placeholderArtistImageArray,
    saveUserInfoToLocalStorage,
    saveMarketToLocalStorage
} from '../helpers';
import { errorModalOpen } from './modalActions';


//
// Helper / formatting functions 
//

const formatUsersTopArtists = data => (
    data.items.map(artist => ({
        artistName: artist.name,
        artistID: artist.id,
        artistImage: artist.images.length ? artist.images : placeholderArtistImageArray   
    }))
    .slice(0, 10)
);

export const formatUsersSavedPlaylists = data => (
    data.items.map(playlist => ({
        playlistName: playlist.name,
        playlistImage: playlist.images.length ? playlist.images : placeholderMusicImageArray,
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
        albumImage: curr.track.album.images.length ? curr.track.album.images : placeholderMusicImageArray,
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


export const partialFetchUserProfile = token => async (dispatch, getState) => {
    dispatch(requestUser());
    const userInfo = getState().userInfo;
    try {
        const usersSavedPlaylists = fetchWrapper('https://api.spotify.com/v1/me/playlists', token);
        const usersRecentTracks = fetchWrapper('https://api.spotify.com/v1/me/player/recently-played', token);
        const usersSavedPlaylistsComplete = await usersSavedPlaylists;
        const usersRecentTracksComplete = await usersRecentTracks;
        const userObject = {
            ...userInfo,
            playlists: formatUsersSavedPlaylists(usersSavedPlaylistsComplete),
            recentTracks: formatUsersRecentTracks(usersRecentTracksComplete),
            timestamp: Date.now()
        };
        dispatch(receiveUser(userObject));
        saveUserInfoToLocalStorage({
            ...userObject,
            hasFetched: true, 
            isFetching: false
        });
    } catch(e) {
        dispatch(errorModalOpen(e));
    }

}

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
            userImage: (userInfoComplete.images.length) ? userInfoComplete.images[0].url : placeholderArtistImageArray,
            followers: userInfoComplete.followers.total,
            market: userInfoComplete.country,
            topArtists: formatUsersTopArtists(usersTopArtistsComplete),
            playlists: formatUsersSavedPlaylists(usersSavedPlaylistsComplete),
            recentTracks: formatUsersRecentTracks(usersRecentTracksComplete),
            timestamp: Date.now() 
        };
        dispatch(receiveUser(userObject));
        saveUserInfoToLocalStorage({
            ...userObject,
            hasFetched: true,
            isFetching: false
        });
    } catch(e) { 
        dispatch(errorModalOpen(e));
    }
};
