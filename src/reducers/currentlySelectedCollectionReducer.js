import * as ActionTypes from '../actiontypes';


export default function currentlySelectedCollection(state={ 
    collectionKey: '', 
    collection: [], 
    isShuffled: false, 
    isRepeating: false 
}, action) {
    switch(action.type) {

        case ActionTypes.SWITCH_CURRENTLY_SELECTED_COLLECTION:
            return {
                collectionKey: action.payload.collectionKey,
                collection: action.payload.collection,
                isShuffled: state.isShuffled,
                isRepeating: state.isRepeating
            }

        case ActionTypes.UPDATE_CURRENTLY_SELECTED_COLLECTION:
            return {
                isShuffled: state.isShuffled,
                isRepeating: state.isRepeating,
                collectionKey: state.collectionKey,
                collection: state.collection.map((track, index) => {
                    return {
                        ...track, 
                        //nonShuffledIndex: index, 
                        isCurrentlySelected: (track.trackID === action.payload) ? true : false,
                        isPlaying: (track.trackID === action.payload) ? !track.isPlaying : false
                    }
                })
            }
        
        case ActionTypes.PLAY_PAUSE_FROM_PLAYER:
            return {
                isShuffled: state.isShuffled,
                isRepeating: state.isRepeating,
                collectionKey: state.collectionKey,
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
                isShuffled: state.isShuffled,
                isRepeating: state.isRepeating,
                collectionKey: state.collectionKey,
                collection: skipForwards(state.collection),
            }

        case ActionTypes.SKIP_TO_PREVIOUS_TRACK:
            return {
                isShuffled: state.isShuffled,
                isRepeating: state.isRepeating,
                collectionKey: state.collectionKey,
                collection: skipBackwards(state.collection)
            }

        case ActionTypes.SHUFFLE_CURRENT_COLLECTION:
            return {
                collectionKey: state.collectionKey,
                collection: shuffleCollection(state.collection),
                isShuffled: true,
                isRepeating: state.isRepeating
            }

        case ActionTypes.UNSHUFFLE_CURRENT_COLLECTION:
            return {
                collectionKey: state.collectionKey,
                collection: [...state.collection].sort((a,b) => a.nonShuffledIndex - b.nonShuffledIndex),
                isShuffled: false,
                isRepeating: state.isRepeating
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







function skipForwards(collection) {
    const currentIndex = collection.findIndex(track => track.isCurrentlySelected);
    const length = collection.length;
    let nextIndex;

    function innerFunc(index) {
        const next = (index === length - 1) ? 0 : index + 1;
        if (collection[next].previewURL) {
            nextIndex = next;
        } else {
            innerFunc(next);
        }
    }

    innerFunc(currentIndex);
    
    return collection.map((track, index) => {
        return {
            ...track,
            isCurrentlySelected: (index === nextIndex) ? true : false,
            isPlaying: (index === nextIndex) ? true : false
        }
    }); 
}



function skipBackwards(collection) {
    const currentIndex = collection.findIndex(track => track.isCurrentlySelected);
    const length = collection.length;
    let nextIndex;

    function innerFunc(index) {
        const next = (index === 0) ? length - 1 : index - 1;
        if (collection[next].previewURL) {
            nextIndex = next;
        } else {
            innerFunc(next);
        }
    }

    innerFunc(currentIndex);
    
    return collection.map((track, index) => {
        return {
            ...track,
            isCurrentlySelected: (index === nextIndex) ? true : false,
            isPlaying: (index === nextIndex) ? true : false
        }
    }); 
}





function shuffleCollection(collection) {
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


function unshuffleCollection(collection) {
    return [...collection].sort((a,b) => a.nonShuffledIndex - b.nonShuffledIndex);
}

