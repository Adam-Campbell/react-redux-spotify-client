import * as ActionTypes from '../actiontypes';


export function storeToken(token) {
    console.log('storeToken was called');
    return {
        type: ActionTypes.STORE_TOKEN,
        payload: token,
    }
}
