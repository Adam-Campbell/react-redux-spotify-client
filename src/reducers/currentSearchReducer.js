import * as ActionTypes from '../actiontypes';


export default function currentSearch(state='', action) {
    switch(action.type) {

        case ActionTypes.UPDATE_SEARCH:
            return action.payload;

        default:
            return state;
    }
}
