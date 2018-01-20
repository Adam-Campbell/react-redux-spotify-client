import * as ActionTypes from '../actiontypes';

export default function accessToken(state='', action) {
    switch(action.type) {
        case ActionTypes.STORE_TOKEN:
            return action.payload;

        default:
            return state;
    }
}