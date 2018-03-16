import * as ActionTypes from '../actiontypes'


const switchCurrentlySelectedCollection = (collectionKey, collection, trackID) => ({
    type: ActionTypes.SWITCH_CURRENTLY_SELECTED_COLLECTION,
    payload: {
        collectionKey: collectionKey,
        collection: collection,
        trackID: trackID
    }
});

const updateCurrentlySelectedCollection = trackID =>({
    type: ActionTypes.UPDATE_CURRENTLY_SELECTED_COLLECTION,
    payload: trackID
});

export const playPauseOrphanAlbumTrack = (trackID, identifier) => (dispatch, getState) => {
    const currentState =  getState();
    if (currentState.currentlySelectedCollection.collectionKey !== identifier) {
        const correctCollection = currentState.orphanAlbums.albumData[identifier];
        dispatch(switchCurrentlySelectedCollection(identifier, correctCollection.albumTracks, trackID));
    } else {
        dispatch(updateCurrentlySelectedCollection(trackID));
    }
};

export const playPausePlaylistTrack = (trackID, identifier) => (dispatch, getState) => {
    const currentState =  getState();
    if (currentState.currentlySelectedCollection.collectionKey !== identifier) {
        const correctCollection = currentState.playlists.playlistData[identifier];
        dispatch(switchCurrentlySelectedCollection(identifier, correctCollection.playlistTracks, trackID));
    } else {
        dispatch(updateCurrentlySelectedCollection(trackID));
    }
};

export const playPauseArtistTopTrack = (trackID, identifier) => (dispatch, getState) => {
    const currentState =  getState();
    if (currentState.currentlySelectedCollection.collectionKey !== identifier) {
        const correctCollection = currentState.artistInfo.artistData[identifier].topTracks;
        dispatch(switchCurrentlySelectedCollection(identifier, correctCollection, trackID));
    } else {
        dispatch(updateCurrentlySelectedCollection(trackID));
    }
};

export const playPauseUserRecentTrack = (trackID, identifier) => (dispatch, getState) => {
    const currentState =  getState();
    if (currentState.currentlySelectedCollection.collectionKey !== identifier) {
        const correctCollection = currentState.userInfo.recentTracks;
        dispatch(switchCurrentlySelectedCollection(identifier, correctCollection, trackID));
    } else {
        dispatch(updateCurrentlySelectedCollection(trackID));
    }
};

export const playPauseFromPlayer = trackID => ({
    type: ActionTypes.PLAY_PAUSE_FROM_PLAYER,
    payload: trackID
});

export const skipToNextTrack = () => ({
    type: ActionTypes.SKIP_TO_NEXT_TRACK
});

export const skipToPreviousTrack = () => ({
    type: ActionTypes.SKIP_TO_PREVIOUS_TRACK
});

export const shuffleCurrentCollection = () => ({
    type: ActionTypes.SHUFFLE_CURRENT_COLLECTION
});

export const unshuffleCurrentCollection = () => ({
    type: ActionTypes.UNSHUFFLE_CURRENT_COLLECTION
});

export const toggleRepeat = () => ({
    type: ActionTypes.TOGGLE_REPEAT
});

export const skipToStartOfCurrentTrack = () => ({
    type: ActionTypes.SKIP_TO_START_OF_CURRENT_TRACK
});
