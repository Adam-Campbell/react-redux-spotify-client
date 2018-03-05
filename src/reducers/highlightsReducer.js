import * as ActionTypes from '../actiontypes';


const defaultState = {
    newReleases: [],
    featuredPlaylists: [],
    categories: [],
    isFetching: false
};

const highlights = (state=defaultState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_HIGHLIGHTS_REQUEST:
            return {
                ...state,
                isFetching: true
            }

        case ActionTypes.FETCH_HIGHLIGHTS_SUCCESS:
            return {
                ...action.payload,
                isFetching: false,
            }

        case ActionTypes.FETCH_CATEGORY_SUCCESS:
            return {
                ...state, 
                categories: [
                    ...state.categories.map(category => {
                        if (category.categoryID === action.payload.id) {
                            return {
                                ...category,
                                categoryPlaylists: [
                                    ...action.payload.playlistArray
                                ]
                            }
                        } else {
                            return category;
                        }
                    })
                ]    
            }

        default:
            return state;

    }
}

export default highlights;