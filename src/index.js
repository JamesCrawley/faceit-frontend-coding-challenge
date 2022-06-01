import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import GlobalStyle from './GlobalStyle';
import store from './store';
import AppWrapper from './AppWrapper';

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <AppWrapper />
  </Provider>,
  document.getElementById('root')
);
