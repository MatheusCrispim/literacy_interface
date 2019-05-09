import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';

import Router from './router/main.router';
import * as serviceWorker from './serviceWorker';
import { rootSaga } from './sagas';
import reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, compose(applyMiddleware(sagaMiddleware)), );

ReactDOM.render(<Provider store={store}>
                    <Router />
                </Provider>, document.getElementById('root'));

sagaMiddleware.run(rootSaga);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();