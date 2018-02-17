// @flow
import 'isomorphic-fetch';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { contactFactory } from './reducer.test';

import * as Actions from './actions';

const mockStore = configureMockStore([thunk]);

describe('Contact actions', () => {

  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('should handle fetchContacts', () => {
    let contacts = contactFactory.buildList(10);
    let expectedActions = [
      {
        type: Actions.FETCH_CONTACTS_PENDING,
      },
      {
        type: Actions.FETCH_CONTACTS_SUCCESS,
        json: contacts,
      }
    ];

    fetchMock.get(Actions.URL, {contacts});
    return store.dispatch(Actions.fetchContacts()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


  it('should handle fetchContacts error', () => {
    let expectedActions = [
      {
        type: Actions.FETCH_CONTACTS_PENDING,
      },
      {
        type: Actions.FETCH_CONTACTS_FAILED,
        error: 'some_error',
      }
    ];

    fetchMock.get(Actions.URL, {
      status: 500,
      body: {
        error: 'some_error',
      }
    });
    return store.dispatch(Actions.fetchContacts()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

})