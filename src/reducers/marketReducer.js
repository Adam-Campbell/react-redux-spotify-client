import * as ActionTypes from '../actiontypes';

const defaultState = '';

export default function market(state=defaultState, action) {
    switch(action.type) {

        case ActionTypes.SET_MARKET:
            return action.payload;

        default:
            return state;

    }
}