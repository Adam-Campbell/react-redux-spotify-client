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





















































// export function playPauseOrphanAlbumTrack(trackID, identifier) {
//     return function(dispatch, getState) {
//         const currentState =  getState();
//         if (currentState.currentlySelectedCollection.collectionKey !== identifier) {
//            const correctCollection = currentState.orphanAlbums.albumData[identifier];
//            dispatch(switchCurrentlySelectedCollection(identifier, correctCollection.albumTracks, trackID));
//         } else {
//             dispatch(updateCurrentlySelectedCollection(trackID));
//         }

//     }
// }



// export function playPausePlaylistTrack(trackID, identifier) {
//     return function(dispatch, getState) {
//         const currentState =  getState();
//         if (currentState.currentlySelectedCollection.collectionKey !== identifier) {
//            const correctCollection = currentState.playlists.playlistData[identifier];
//            dispatch(switchCurrentlySelectedCollection(identifier, correctCollection.playlistTracks, trackID));
//         } else {
//             dispatch(updateCurrentlySelectedCollection(trackID));
//         }

//     }
// }




// export function playPauseArtistTopTrack(trackID, identifier) {
//     return function(dispatch, getState) {
//         const currentState =  getState();
//         if (currentState.currentlySelectedCollection.collectionKey !== identifier) {
//            const correctCollection = currentState.artistInfo.artistData[identifier].topTracks;
//            dispatch(switchCurrentlySelectedCollection(identifier, correctCollection, trackID));
//         } else {
//             dispatch(updateCurrentlySelectedCollection(trackID));
//         }

//     }
// }





// export function playPauseUserRecentTrack(trackID, identifier) {
//     return function(dispatch, getState) {
//         const currentState =  getState();
//         if (currentState.currentlySelectedCollection.collectionKey !== identifier) {
//            const correctCollection = currentState.userInfo.recentTracks;
//            dispatch(switchCurrentlySelectedCollection(identifier, correctCollection, trackID));
//         } else {
//             dispatch(updateCurrentlySelectedCollection(trackID));
//         }

//     }
// }



// export function playPauseFromPlayer(trackID) {
//     return {
//         type: ActionTypes.PLAY_PAUSE_FROM_PLAYER,
//         payload: trackID
//     }
// }


// export function skipToNextTrack() {
//     return {
//         type: ActionTypes.SKIP_TO_NEXT_TRACK
//     }
// }

// export function skipToPreviousTrack() {
//     return {
//         type: ActionTypes.SKIP_TO_PREVIOUS_TRACK
//     }
// }






// function switchCurrentlySelectedCollection(collectionKey, collection, trackID) {
//     return {
//         type: ActionTypes.SWITCH_CURRENTLY_SELECTED_COLLECTION,
//         payload: {
//             collectionKey: collectionKey,
//             collection: collection,
//             trackID: trackID
//         }
//     }
// }

// function updateCurrentlySelectedCollection(trackID) {
//     return {
//         type: ActionTypes.UPDATE_CURRENTLY_SELECTED_COLLECTION,
//         payload: trackID
//     }
// } 

// export function shuffleCurrentCollection() {
//     return {
//         type: ActionTypes.SHUFFLE_CURRENT_COLLECTION
//     }
// }

// export function unshuffleCurrentCollection() {
//     return {
//         type: ActionTypes.UNSHUFFLE_CURRENT_COLLECTION
//     }
// }


// export function toggleRepeat() {
//     return {
//         type: ActionTypes.TOGGLE_REPEAT
//     }
// }

