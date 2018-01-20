import * as ActionTypes from '../actiontypes';




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


function fetchNewReleases(token) {
    return fetch(`https://api.spotify.com/v1/browse/new-releases?access_token=${token}`);
}

function fetchFeaturedPlaylists(token) {
    return fetch(`https://api.spotify.com/v1/browse/featured-playlists?access_token=${token}`);
}

function fetchCategories(token) {
    return fetch(`https://api.spotify.com/v1/browse/categories?access_token=${token}`);
}


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




export function fetchHighlights(token) {
    return async function(dispatch) {

        dispatch(requestHighlights())
        const highlightsObject = {};

        const newReleases = fetchNewReleases(token);
        const featuredPlaylists = fetchFeaturedPlaylists(token);
        const categories = fetchCategories(token);

        const newReleasesComplete = await newReleases;
        const newReleasesJSON = await newReleasesComplete.json();
        highlightsObject.newReleases = createNewReleasesArray(newReleasesJSON.albums.items);

        const featuredPlaylistsComplete = await featuredPlaylists;
        const featuredPlaylistsJSON = await featuredPlaylistsComplete.json();
        highlightsObject.featuredPlaylists = createFeaturedPlaylistsArray(featuredPlaylistsJSON.playlists.items);
        

        const categoriesComplete = await categories;
        const categoriesJSON = await categoriesComplete.json();
        highlightsObject.categories = createCategoriesArray(categoriesJSON.categories.items);
        dispatch(receiveHighlights(highlightsObject));
    }
}
