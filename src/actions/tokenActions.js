import * as ActionTypes from '../actiontypes';

export function storeToken(token) {
    return {
        type: ActionTypes.STORE_TOKEN,
        payload: token,
    }
}