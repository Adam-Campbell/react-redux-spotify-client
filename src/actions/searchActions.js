import * as ActionTypes from '../actiontypes';
import { fetchWrapper, placeholderMusicImageArray, placeholderArtistImageArray } from '../helpers';
import { errorModalOpen } from './modalActions';

//
// Helper / formatting functions 
//

const formatArtistSearchResults = data => (
    data.map(artist => ({
        artistName: artist.name,
        artistID: artist.id,
        artistImage: artist.images.length ? artist.images : placeholderArtistImageArray
    }))
);

const formatAlbumSearchResults = data => (
    data.map(album => ({
        artistName: album.artists[0].name,
        artistID: album.artists[0].id,
        albumName: album.name,
        albumID: album.id,
        albumImage: album.images.length ? album.images : placeholderMusicImageArray
    }))
);

const formatPlaylistSearchResults = data => (
    data.map(playlist => ({
        ownerName: playlist.owner.display_name,
        ownerID: playlist.owner.id,
        playlistName: playlist.name,
        playlistID: playlist.id,
        playlistImage: playlist.images.length ? playlist.images : placeholderMusicImageArray
    }))
);


//
// Actions
//

const requestSearchResults = () => ({
    type: ActionTypes.FETCH_SEARCH_RESULTS_REQUEST
});

const receiveSearchResults = results => ({
    type: ActionTypes.FETCH_SEARCH_RESULTS_SUCCESS,
    payload: results
});

export const updateSearch = search => ({
    type: ActionTypes.UPDATE_SEARCH,
    payload: search
});

export const fetchSearchResults = (query, token) => async (dispatch, getState) => {
    dispatch(requestSearchResults());

    const market = getState().userInfo.market;

    try {
        const searchResults = await fetchWrapper(`https://api.spotify.com/v1/search?q=${query}&type=artist,album,playlist&market=${market}`, token);  
        
        const searchResultsObject = {
            artists: formatArtistSearchResults(searchResults.artists.items),
            albums: formatAlbumSearchResults(searchResults.albums.items),
            playlists: formatPlaylistSearchResults(searchResults.playlists.items)
        }

        dispatch(receiveSearchResults(searchResultsObject));
    } catch(e) {
        dispatch(errorModalOpen(e));
    }
};
