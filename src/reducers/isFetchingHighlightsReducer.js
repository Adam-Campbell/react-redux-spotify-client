import * as ActionTypes from '../actiontypes';


export default function isFetchingHighlights(state=false, action) {
    switch(action.type) {
        case ActionTypes.FETCH_HIGHLIGHTS_REQUEST:
            return true;

        case ActionTypes.FETCH_HIGHLIGHTS_SUCCESS:
            return false;

        default:
            return state;
    }
}
