import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './apps/main/App';

const app = document.getElementById('app')

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>, app
);
