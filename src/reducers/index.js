import * as ActionTypes from '../actiontypes';
import { combineReducers } from 'redux';
import accessToken from './accessTokenReducer';
import artistInfo from './artistInfoReducer';
import isFetchingArtist from './isFetchingArtistReducer';
import currentSearch from './currentSearchReducer';
import searchResults from './searchResultsReducer';
import isFetchingUser from './isFetchingUserReducer';
import userInfo from './userInfoReducer';
import isFetchingHighlights from './isFetchingHighlightsReducer';
import highlights from './highlightsReducer';
import isFetchingOrphanAlbum from './isFetchingOrphanAlbumReducer';
import orphanAlbums from './orphanAlbumsReducer';
import isFetchingPlaylist from './isFetchingPlaylistReducer';
import playlists from './playlistsReducer';
import currentlySelectedCollection from './currentlySelectedCollectionReducer';


export default combineReducers({
    accessToken,
    isFetchingArtist,
    currentSearch,
    searchResults,
    artistInfo,
    isFetchingUser,
    userInfo,
    isFetchingHighlights,
    highlights,
    isFetchingOrphanAlbum,
    orphanAlbums,
    isFetchingPlaylist,
    playlists,
    currentlySelectedCollection
});
