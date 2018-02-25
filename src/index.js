import 'whatwg-fetch';
import 'babel-polyfill';
import './scss/style.scss';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);