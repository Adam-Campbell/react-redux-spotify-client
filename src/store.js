import { createStore, applyMiddleware, compose } from 'redux';
import * as ActionTypes from './actiontypes';
import { setMarket } from './actions/userActions';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { authURL } from './globalConstants';
import { fetchWrapper } from './helpers';

//  Look for accessToken in localStorage.
//  Return it if it's present and if it's still valid (worked out by timestamp) so that 
//  the store is initialized with the pre-existing accessToken. 
//  However if any of the conditions aren't met, return undefined so that the store is 
//  initialized with the defaultstate defined in the reducers.
const loadTokenFromLocalStorage = () => {
    try {
        const JSONAccessToken = localStorage.getItem('accessToken');
        if (JSONAccessToken === null) { 
            return undefined; 
        }
        const accessToken = JSON.parse(JSONAccessToken);
        console.log(accessToken.timestamp);
        if (Date.now() - accessToken.timestamp > 3000000) {
            return undefined;
        }
        return {
            accessToken: accessToken
        };
    } catch(err) {
        return undefined;
    }
};

const loadMarketFromLocalStorage = () => {
    try {
        const JSONMarket = localStorage.getItem('market');
        if (JSONMarket === null) { 
            return undefined; 
        }
        const market = JSON.parse(JSONMarket);
        return {
            market: market
        };
    } catch(err) {
        return undefined;
    }
};

const authMiddleware = store => next => action => {
    if (action.type === 'STORE_TOKEN') {
        return next(action);
    }
    // get state from store
    const timestamp = store.getState().accessToken.timestamp;
    const currentTime = Date.now();
    // check if token is expired
    // if it is, just return the action as normal
    // if it isn't, redirect user to spotifys auth page
    if (timestamp !== null && currentTime - timestamp > 3000000) {
        window.location = authURL;
        return;
    }
    return next(action);
};


const localStorageToken = loadTokenFromLocalStorage();
const localStorageMarket = loadMarketFromLocalStorage();

const combinedInitialState = {
    ...localStorageToken,
    ...localStorageMarket
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    combinedInitialState,
    composeEnhancers(
        applyMiddleware(authMiddleware, thunk)
    )
);

export default store;