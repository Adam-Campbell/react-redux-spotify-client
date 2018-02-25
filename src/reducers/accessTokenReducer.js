import * as ActionTypes from '../actiontypes';

const defaultState = {
    token: '',
    timestamp: null
};

export default function accessToken(state=defaultState, action) {
    switch(action.type) {
        case ActionTypes.STORE_TOKEN:
            return {
                ...action.payload
            }

        default:
            return state;
    }
}