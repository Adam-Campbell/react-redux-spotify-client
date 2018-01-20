import * as ActionTypes from '../actiontypes';


export default function isFetchingUser(state=false, action) {
    switch(action.type) {
        case ActionTypes.FETCH_USER_REQUEST:
            return true;

        case ActionTypes.FETCH_USER_SUCCESS:
            return false;

        default:
            return state;
    }
}
