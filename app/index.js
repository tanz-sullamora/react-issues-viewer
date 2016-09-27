import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from './store';

import Layout from './components/layout';
import IssuePage from './components/issue-page';
import MainPage from './components/main-page';

import './theme/theme.css';


render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute name="main" component={MainPage} />
        <Route path="/search/(:owner)/(:repo)" component={MainPage} />
        <Route path="/issues/:owner/:repo/pull/:id" component={IssuePage} />
        <Route path="/issues/:owner/:repo/issues/:id" component={IssuePage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
