// @flow

import type { Contact } from './actions';

import Faker from 'faker';
import { Factory } from 'rosie';

import {
  contactsReducer,
  newContact,
  STATES,
} from './reducer';

import * as Actions from './actions';

export const contactFactory = new Factory()
  .sequence('name', () => `${Faker.name.firstName()} ${Faker.name.lastName()}`)
  .sequence('phone_number', () => Faker.phone.phoneNumber())
  .sequence('address', () => `${
    Faker.address.streetName()
  }, ${
    Faker.address.city()
  }, ${
    Faker.address.zipCode()
  }`);

export const stateFactory = ( contacts: Array<Contact>) => ({
  contacts,
  status: STATES.idle,
});

describe('Contact reducer', () => {

  let mockContacts, mockState;

  beforeEach(() => {
    mockContacts = contactFactory.buildList(10);
    mockState = stateFactory(mockContacts);
  })

  it ('should return the default state', () => {
    expect(contactsReducer(undefined, {})).toEqual({
      contacts: [],
      status: STATES.idle,
    });
  });

  it ('should handle ADD_CONTACT correctly', () => {
    let state = contactsReducer(mockState, {
      type: Actions.ADD_CONTACT,
    });

    mockContacts.forEach((c, idx) => expect(state.contacts[idx]).toEqual(c));
    expect(state.contacts.find(c => c.status === STATES.editing))
      .toEqual(newContact);
  });

  it ('should handle REMOVE_CONTACT correctly', () => {
    let state = contactsReducer(mockState, {
      type: Actions.REMOVE_CONTACT,
      idx: 2,
    });

    expect(state.contacts.length).toBe(9);
    expect(state.contacts.find(c => c.name === mockContacts[2].name))
      .toBe(undefined);
  });

  it ('should handle CHANGE_CONTACT correctly', () => {
    let newName = Faker.lorem.word();
    let state = contactsReducer(mockState, {
      type: Actions.CHANGE_CONTACT,
      idx: 3,
      contact: {
        name: newName,
      }
    });

    mockContacts.forEach((c, idx) => idx === 3
      ? expect(state.contacts[idx]).toEqual({
        ...c,
        name: newName,
      })
      : expect(state.contacts[idx]).toEqual(c)
    )
  });

  it ('should handle EDIT_CONTACT', () => {
    let state = contactsReducer(mockState, {
      type: Actions.EDIT_CONTACT,
      idx: 3,
    });

    expect(state.contacts[3].status).toEqual(STATES.editing);
  });

  it ('should handle STOP_EDITING_CONTACT', () => {
    let state = contactsReducer({
      ...mockState,
      contacts: [
        {
          ...mockState.contacts[0],
          status: STATES.editing,
        },
        ...mockState.contacts.slice(1),
      ]
    }, {
      type: Actions.STOP_EDITING_CONTACT,
    });

    expect(state.contacts[0].status).toEqual(STATES.idle);
  })

  it ('should handle FETCH_CONTACTS_PENDING', () => {
    let state = contactsReducer(mockState, {
      type: Actions.FETCH_CONTACTS_PENDING,
    });

    expect(state.status).toEqual(STATES.pending);
  });


  it ('should handle FETCH_CONTACTS_ERROR', () => {
    let state = contactsReducer(mockState, {
      type: Actions.FETCH_CONTACTS_FAILED,
      error: 'some_error',
    });

    expect(state.status).toEqual(STATES.failed);
    expect(state.error).toEqual('some_error');
  });

  it ('should handle FETCH_CONTACTS_SUCCESS', () => {
    let newContacts = contactFactory.buildList(10);
    let state = contactsReducer(mockState, {
      type: Actions.FETCH_CONTACTS_SUCCESS,
      json: newContacts,
    });

    expect(state.contacts.length).toBe(20);
    [...mockContacts, ...newContacts].forEach((c, idx) => {
      expect(state.contacts[idx]).toEqual(c);
    });
  });

});

