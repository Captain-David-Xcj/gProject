import React from 'react';
import ReactDOM from 'react-dom';
import LayOut from '../app/LayOut';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from '../app/reducers';
import {BrowserRouter} from "react-router-dom";

const store=createStore(rootReducer);
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <LayOut/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);