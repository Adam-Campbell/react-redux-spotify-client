import * as ActionTypes from '../actiontypes'


export function playPauseOrphanAlbumTrack(trackID, identifier) {
    return function(dispatch, getState) {
        const currentState =  getState();
        if (currentState.currentlySelectedCollection.collectionKey !== identifier) {
           //
           //   Grab the new collection from state
           //   Save it locally
           //   Map over tracks, add both booleans, set both to true if trackID matches, 
           //   but set both to false if it doesn't.
           //   then dispatch that to update the currentlySelectedCollection part of state.
           const correctCollection = currentState.orphanAlbums[identifier];
           const nextCollection = correctCollection.albumTracks.map((track, index) => {
               return {
                    ...track, 
                    isCurrentlySelected: (track.trackID === trackID) ? true : false,
                    isPlaying: (track.trackID === trackID) ? true : false,
                    nonShuffledIndex: index
               }
           });
           dispatch(switchCurrentlySelectedCollection(identifier, nextCollection));
        } else {
            //
            //  just dispatch the updateCurrentlySelectedCollection action with the trackID
            dispatch(updateCurrentlySelectedCollection(trackID));
        }

    }
}



export function playPausePlaylistTrack(trackID, identifier) {
    return function(dispatch, getState) {
        const currentState =  getState();
        if (currentState.currentlySelectedCollection.collectionKey !== identifier) {
           const correctCollection = currentState.playlists[identifier];
           const nextCollection = correctCollection.playlistTracks.map((track, index) => {
               return {
                    ...track, 
                    isCurrentlySelected: (track.trackID === trackID) ? true : false,
                    isPlaying: (track.trackID === trackID) ? true : false,
                    nonShuffledIndex: index
               }
           });
           dispatch(switchCurrentlySelectedCollection(identifier, nextCollection));
        } else {
            dispatch(updateCurrentlySelectedCollection(trackID));
        }

    }
}


export function playPauseArtistTopTrack(trackID, identifier) {
    return function(dispatch, getState) {
        const currentState =  getState();
        if (currentState.currentlySelectedCollection.collectionKey !== identifier) {
           const correctCollection = currentState.artistInfo.topTracks;
           const nextCollection = correctCollection.map((track, index) => {
               return {
                    ...track, 
                    isCurrentlySelected: (track.trackID === trackID) ? true : false,
                    isPlaying: (track.trackID === trackID) ? true : false,
                    nonShuffledIndex: index
               }
           });
           dispatch(switchCurrentlySelectedCollection(identifier, nextCollection));
        } else {
            dispatch(updateCurrentlySelectedCollection(trackID));
        }

    }
}

export function playPauseArtistAlbumTrack(trackID, identifier) {
    return function(dispatch, getState) {
        const currentState =  getState();
        if (currentState.currentlySelectedCollection.collectionKey !== identifier) {
           const correctCollection = currentState.artistInfo.albums[
               currentState.artistInfo.albums.findIndex(album => album.albumID === identifier)
           ];
           const nextCollection = correctCollection.albumTracks.map((track, index) => {
               return {
                    ...track, 
                    isCurrentlySelected: (track.trackID === trackID) ? true : false,
                    isPlaying: (track.trackID === trackID) ? true : false,
                    nonShuffledIndex: index
               }
           });
           dispatch(switchCurrentlySelectedCollection(identifier, nextCollection));
        } else {
            dispatch(updateCurrentlySelectedCollection(trackID));
        }

    }
}


export function playPauseUserRecentTrack(trackID, identifier) {
    return function(dispatch, getState) {
        const currentState =  getState();
        if (currentState.currentlySelectedCollection.collectionKey !== identifier) {
           const correctCollection = currentState.userInfo.recentTracks;
           const nextCollection = correctCollection.map((track, index) => {
               return {
                    ...track, 
                    isCurrentlySelected: (track.trackID === trackID) ? true : false,
                    isPlaying: (track.trackID === trackID) ? true : false,
                    nonShuffledIndex: index
               }
           });
           dispatch(switchCurrentlySelectedCollection(identifier, nextCollection));
        } else {
            dispatch(updateCurrentlySelectedCollection(trackID));
        }

    }
}



export function playPauseFromPlayer(trackID) {
    return {
        type: ActionTypes.PLAY_PAUSE_FROM_PLAYER,
        payload: trackID
    }
}


export function skipToNextTrack() {
    return {
        type: ActionTypes.SKIP_TO_NEXT_TRACK
    }
}

export function skipToPreviousTrack() {
    return {
        type: ActionTypes.SKIP_TO_PREVIOUS_TRACK
    }
}






function switchCurrentlySelectedCollection(collectionKey, collection) {
    return {
        type: ActionTypes.SWITCH_CURRENTLY_SELECTED_COLLECTION,
        payload: {
            collectionKey: collectionKey,
            collection: collection
        }
    }
}

function updateCurrentlySelectedCollection(trackID) {
    return {
        type: ActionTypes.UPDATE_CURRENTLY_SELECTED_COLLECTION,
        payload: trackID
    }
} 

export function shuffleCurrentCollection() {
    return {
        type: ActionTypes.SHUFFLE_CURRENT_COLLECTION
    }
}

export function unshuffleCurrentCollection() {
    return {
        type: ActionTypes.UNSHUFFLE_CURRENT_COLLECTION
    }
}


export function toggleRepeat() {
    return {
        type: ActionTypes.TOGGLE_REPEAT
    }
}