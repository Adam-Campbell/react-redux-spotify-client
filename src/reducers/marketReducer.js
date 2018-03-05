import * as ActionTypes from '../actiontypes';

const defaultState = '';

const market = (state=defaultState, action) => {
    switch(action.type) {
        case ActionTypes.SET_MARKET:
            return action.payload;

        default:
            return state;

    }
}

export default market;