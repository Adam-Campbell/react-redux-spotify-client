import * as ActionTypes from '../actiontypes';
import { genericFetchWrapper } from './helpers';
import { errorModalOpen } from './modalActions';


//
// Exported thunk action
//

export function fetchHighlights(token) {
    return async function(dispatch, getState) {

        const currentState =  getState();
        const market = currentState.market;
        dispatch(requestHighlights());
        try {
            const newReleases = genericFetchWrapper(`https://api.spotify.com/v1/browse/new-releases?country=${market}&limit=50`, token);
            const featuredPlaylists = genericFetchWrapper(`https://api.spotify.com/v1/browse/featured-playlists?country=${market}&limit=50`, token);
            const categories = genericFetchWrapper("https://api.spotify.com/v1/browse/categories", token);

            const newReleasesComplete = await newReleases;
            const featuredPlaylistsComplete = await featuredPlaylists;
            const categoriesComplete = await categories;

            const highlightsObject = {
                newReleases: createNewReleasesArray(newReleasesComplete.albums.items),
                featuredPlaylists: createFeaturedPlaylistsArray(featuredPlaylistsComplete.playlists.items),
                categories: createCategoriesArray(categoriesComplete.categories.items)
            };

            dispatch(receiveHighlights(highlightsObject));
        } catch(e) {
            dispatch(errorModalOpen(e));
        }
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


