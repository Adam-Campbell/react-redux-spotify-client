import * as ActionTypes from '../actiontypes';

export default function accessToken(state={token: '', timestamp: 0}, action) {
    switch(action.type) {
        case ActionTypes.STORE_TOKEN:
            return {
                ...action.payload
            }

        default:
            return state;
    }
}