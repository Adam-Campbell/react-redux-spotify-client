import * as ActionTypes from '../actiontypes';


export function storeToken(token, timestamp) {
    console.log('storeToken was called');
    return {
        type: ActionTypes.STORE_TOKEN,
        payload: {
            token: token,
            timestamp: timestamp
        }
    }
}


