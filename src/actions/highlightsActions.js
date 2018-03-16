import * as ActionTypes from '../actiontypes';
import { fetchWrapper, placeholderMusicImageArray } from '../helpers';
import { errorModalOpen } from './modalActions';

//
// Helper / formatting functions 
//

const createNewReleasesArray = data => (
    data.map(album => ({
        albumName: album.name,
        albumID: album.id,
        albumImage: album.images.length ? album.images : placeholderMusicImageArray,
        artistName: album.artists[0].name,
        artistID: album.artists[0].id
    }))
);

const createFeaturedPlaylistsArray = data => (
    data.map(playlist => ({
        playlistName: playlist.name,
        playlistID: playlist.id,
        ownerID: playlist.owner.id,
        playlistImage: playlist.images.length ? playlist.images : placeholderMusicImageArray  
    }))
);

const createCategoriesArray = data => (
    data.map(category =>({
        categoryName: category.name,
        categoryID: category.id,
        categoryIcon: category.icons.length ? category.icons : placeholderMusicImageArray,
        categoryPlaylists: []
    }))
);


//
// Actions
//

const requestHighlights = () => ({
    type: ActionTypes.FETCH_HIGHLIGHTS_REQUEST
});


const receiveHighlights = highlightsObject => ({
    type: ActionTypes.FETCH_HIGHLIGHTS_SUCCESS,
    payload: highlightsObject
});


export const fetchHighlights = token => async (dispatch, getState) => {
    const market = getState().userInfo.market;
    dispatch(requestHighlights());
    try {
        const newReleases = fetchWrapper(`https://api.spotify.com/v1/browse/new-releases?country=${market}&limit=50`, token);
        const featuredPlaylists = fetchWrapper(`https://api.spotify.com/v1/browse/featured-playlists?country=${market}&limit=50`, token);
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
    } catch(e) {
        dispatch(errorModalOpen(e));
    }
};
