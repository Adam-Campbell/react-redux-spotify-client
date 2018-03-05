import * as ActionTypes from '../actiontypes';


// Skips to next track, but if there is no previewURL for that track it will keep skipping
// forward through the tracks until it finds one with a previewURL. Worst case it will loop
// through the entire playlist before returning to the track it was already playing. 
const skipForwards = collection => {
    const currentIndex = collection.findIndex(track => track.isCurrentlySelected);
    const length = collection.length;
    let nextIndex;

    const skipRecursively = index => {
        const next = (index === length - 1) ? 0 : index + 1;
        if (collection[next].previewURL) {
            nextIndex = next;
        } else {
            skipRecursively(next);
        }
    }

    skipRecursively(currentIndex);
    
    return collection.map((track, index) => ({
        ...track,
        isCurrentlySelected: (index === nextIndex) ? true : false,
        isPlaying: (index === nextIndex) ? true : false
    })); 
}


// Similar to skipForwards, but skips backwards through the tracklist. 
const skipBackwards = collection => {
    const currentIndex = collection.findIndex(track => track.isCurrentlySelected);
    const length = collection.length;
    let nextIndex;

    const skipRecursively = index => {
        const next = (index === 0) ? length - 1 : index - 1;
        if (collection[next].previewURL) {
            nextIndex = next;
        } else {
            skipRecursively(next);
        }
    }

    skipRecursively(currentIndex);
    
    return collection.map((track, index) => ({
        ...track,
        isCurrentlySelected: (index === nextIndex) ? true : false,
        isPlaying: (index === nextIndex) ? true : false
    })); 
}


// Shuffles the currently playing collection / tracklist. 
// The unshuffle function is much simpler so I have just inlined it within the reducer.
const shuffleCollection = collection => {
    // create copy of old collection, and new empty collection.
    const oldCollection = [...collection];
    const newCollection = [];
    // we want currently selected track to be first in list after shuffle, 
    // so find its index, then grab it and transfer to newCollection. 
    const firstIndex = oldCollection.findIndex(track => track.isCurrentlySelected);
    newCollection.push(oldCollection.splice(firstIndex, 1)[0]);
    // As long as there are still tracks in oldArr, grab one at random and push it
    // onto the end of newCollection. 
    while (oldCollection.length) {
  	    let index = Math.floor(Math.random() * oldCollection.length);
        newCollection.push(oldCollection.splice(index, 1)[0])
    }
  return newCollection;
}


const defaultState = {
    collectionKey: '', 
    collection: [], 
    isShuffled: false, 
    isRepeating: false 
};

const currentlySelectedCollection = (state=defaultState, action) => {
    switch(action.type) {
        case ActionTypes.SWITCH_CURRENTLY_SELECTED_COLLECTION:
            return {
                ...state,
                collectionKey: action.payload.collectionKey,
                collection: action.payload.collection.map((track, index) => {
                    return {
                        ...track, 
                        isCurrentlySelected: (track.trackID === action.payload.trackID) ? true : false,
                        isPlaying: (track.trackID === action.payload.trackID) ? true : false,
                        nonShuffledIndex: index
                    }
                })
            }

        case ActionTypes.UPDATE_CURRENTLY_SELECTED_COLLECTION:
            return {
                ...state,
                collection: state.collection.map((track, index) => {
                    return {
                        ...track, 
                        isCurrentlySelected: (track.trackID === action.payload) ? true : false,
                        isPlaying: (track.trackID === action.payload) ? !track.isPlaying : false
                    }
                })
            }
        
        case ActionTypes.PLAY_PAUSE_FROM_PLAYER:
            return {
                ...state,
                collection: state.collection.map(track => {
                    return {
                        ...track, 
                        isCurrentlySelected: (track.trackID === action.payload) ? true : false,
                        isPlaying: (track.trackID === action.payload) ? !track.isPlaying : false
                    }
                })
            }

        case ActionTypes.SKIP_TO_NEXT_TRACK:
            return {
                ...state,
                collection: skipForwards(state.collection),
            }

        case ActionTypes.SKIP_TO_PREVIOUS_TRACK:
            return {
                ...state,
                collection: skipBackwards(state.collection)
            }

        case ActionTypes.SHUFFLE_CURRENT_COLLECTION:
            return {
                ...state,
                collection: shuffleCollection(state.collection),
                isShuffled: true
            }

        case ActionTypes.UNSHUFFLE_CURRENT_COLLECTION:
            return {
                ...state,
                collection: [...state.collection].sort((a,b) => a.nonShuffledIndex - b.nonShuffledIndex),
                isShuffled: false
            }

        case ActionTypes.TOGGLE_REPEAT:
            return {
                ...state,
                isRepeating: !state.isRepeating
            }

        default:
            return state;
    }
}

export default currentlySelectedCollection;


