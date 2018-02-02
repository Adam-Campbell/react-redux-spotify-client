import * as ActionTypes from '../actiontypes';
import { combineReducers } from 'redux';

import accessToken from './accessTokenReducer';
import artistInfo from './artistInfoReducer';
import searchResults from './searchResultsReducer';
import userInfo from './userInfoReducer';
import highlights from './highlightsReducer';
import orphanAlbums from './orphanAlbumsReducer';
import playlists from './playlistsReducer';
import currentlySelectedCollection from './currentlySelectedCollectionReducer';
import market from './marketReducer';


export default combineReducers({
    accessToken,
    searchResults,
    artistInfo,
    userInfo,
    highlights,
    orphanAlbums,
    playlists,
    currentlySelectedCollection,
    market
});
