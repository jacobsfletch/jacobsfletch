import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import allReducers from './reducers';
import App from './apps/main/App';

const store = createStore(allReducers)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('app')
);
