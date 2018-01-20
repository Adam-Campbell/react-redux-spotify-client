import * as ActionTypes from '../actiontypes';


export default function userInfo(state={}, action) {
    switch (action.type) {

        case ActionTypes.FETCH_USER_SUCCESS:
            return action.payload;

        default:
            return state;

    }
}
