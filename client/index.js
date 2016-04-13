import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactRoutes from './routes/routes.js';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    {ReactRoutes}
  </Provider>
, document.getElementById('app'));