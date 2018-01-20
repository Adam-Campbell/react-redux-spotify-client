import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import * as ActionCreators from './actions';
import reducer from './reducers';
import './scss/style.scss';
/*
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'; 
import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee';
import faPauseCircle from '@fortawesome/fontawesome-free-solid/faPauseCircle';

fontawesome.library.add(faCoffee, faPauseCircle);
*/
//const navToggle = document.getElementById('nav-toggle');
//const container = document.querySelector('.main-container');

//navToggle.addEventListener('click', function() {
//    container.classList.toggle('nav-open');
//});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

//window.store = store;
//store.dispatch(ActionCreators.storeToken('ABC'));

render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);


/*
if (window.location.hash) {
    access_token = window.location.hash.split('#access_token=')[1].split('&')[0];
    getRelatedArtists();
}

window.authorize = authorize;
*/