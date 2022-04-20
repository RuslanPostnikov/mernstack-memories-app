import React from 'react';
import ReactDom from  'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './store/store';

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
