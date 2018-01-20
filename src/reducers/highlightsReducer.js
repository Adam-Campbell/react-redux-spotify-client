import * as ActionTypes from '../actiontypes';


export default function highlights(state={}, action) {
    switch (action.type) {

        case ActionTypes.FETCH_HIGHLIGHTS_SUCCESS:
            return action.payload;

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
