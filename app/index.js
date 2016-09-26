import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from './store';

import Layout from './components/layout';
import MainPage from './components/main-page';

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute name="main" component={MainPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
