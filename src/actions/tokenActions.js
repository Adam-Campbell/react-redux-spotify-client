import * as ActionTypes from '../actiontypes';


export const storeToken = (token, timestamp) => ({
    type: ActionTypes.STORE_TOKEN,
    payload: {
        token: token,
        timestamp: timestamp
    }
});
