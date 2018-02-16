import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

import fetchMock from 'fetch-mock';
import * as Actions from './actions';
import { contactFactory } from './reducer.test';

it('renders without crashing', () => {
  let contacts = contactFactory.buildList(10);
  fetchMock.get(Actions.URL, {contacts});

  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
