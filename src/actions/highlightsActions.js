import * as ActionTypes from '../actiontypes';
import { fetchWrapper } from './helpers';



//
// Exported thunk action
//

export function fetchHighlights(token) {
    return async function(dispatch) {

        dispatch(requestHighlights())
        
        const newReleases = fetchWrapper("https://api.spotify.com/v1/browse/new-releases", token);
        const featuredPlaylists = fetchWrapper("https://api.spotify.com/v1/browse/featured-playlists", token);
        const categories = fetchWrapper("https://api.spotify.com/v1/browse/categories", token);

        const newReleasesComplete = await newReleases;
        const featuredPlaylistsComplete = await featuredPlaylists;
        const categoriesComplete = await categories;

        const highlightsObject = {
            newReleases: createNewReleasesArray(newReleasesComplete.albums.items),
            featuredPlaylists: createFeaturedPlaylistsArray(featuredPlaylistsComplete.playlists.items),
            categories: createCategoriesArray(categoriesComplete.categories.items)
        };

        dispatch(receiveHighlights(highlightsObject));
    }
}


//
// Other actions called by thunk (not exported)
//

function requestHighlights() {
    return {
        type: ActionTypes.FETCH_HIGHLIGHTS_REQUEST
    }
}

function receiveHighlights(highlightsObject) {
    return {
        type: ActionTypes.FETCH_HIGHLIGHTS_SUCCESS,
        payload: highlightsObject
    }
}


//
// Helper functions 
//

function createNewReleasesArray(data) {
    return data.map(album => {
        return {
            albumName: album.name,
            albumID: album.id,
            albumImage: (album.images.length) ? album.images[0].url : '',
            artistName: album.artists[0].name,
            artistID: album.artists[0].id
        };
    })
}

function createFeaturedPlaylistsArray(data) {
    return data.map(playlist => {
        return {
            playlistName: playlist.name,
            playlistID: playlist.id,
            ownerID: playlist.owner.id,
            playlistImage: (playlist.images.length) ? playlist.images[0].url : ''
        };
    })
}

function createCategoriesArray(data) {
    return data.map(category => {
        return {
            categoryName: category.name,
            categoryID: category.id,
            categoryIcon: (category.icons.length) ? category.icons[0].url : '',
            categoryPlaylists: []
        };
    })
}


