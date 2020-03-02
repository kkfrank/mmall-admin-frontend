import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './store'
import Home from './router/index'
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <Home />
    </Provider>,
    document.getElementById('app')
);

