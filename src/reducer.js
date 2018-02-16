// @flow
import { combineReducers } from 'redux';
import type { Contact, ContactAction } from './actions';
import * as Actions from './actions';

export type ContactState = {
  contacts: Array<Contact>,
  status?: number,
};

export const STATES = {
  pending: 1,
  success: 2,
  failed: 3,
  idle: 4,
  editing: 5,
};

export const newContact = {
  name: '',
  phone_number: '',
  address: '',
  status: STATES.editing,
};

/** Reducer */
export const contactsReducer = (state : ContactState = {
  contacts: [],
  status: STATES.idle,
}, action : ContactAction) : ContactState => {

  switch (action.type) {

  case Actions.ADD_CONTACT:

    return {
      ...state,
      contacts: [
        ...state.contacts.map(contact =>
          contact.status === STATES.editing
            ? {
              ...contact,
              status: STATES.idle,
            }
            : contact
          ),
        newContact,
      ],
    }

  case Actions.CHANGE_CONTACT: {
    let { contact: newContact } = action;

    return {
      ...state,
      contacts: state.contacts.map((contact, idx) => idx === action.idx
        ? { ...contact, ...newContact }
        : contact
      )
    }
  }

  case Actions.REMOVE_CONTACT: {
    let { idx: _idx } = action;

    return {
      ...state,
      contacts: state.contacts.filter((contact, idx) => idx !== _idx),
    }
  }

  case Actions.FETCH_CONTACTS_PENDING:

    return {
      ...state,
      status: STATES.pending,
    }

  case Actions.FETCH_CONTACTS_FAILED:

    return {
      ...state,
      status: STATES.failed,
      error: action.error,
    }

  case Actions.FETCH_CONTACTS_SUCCESS:

    return {
      ...state,
      contacts: [
        ...state.contacts,
        ...action.json.filter(({name}) =>
          state.contacts.find(({name: _name}) => name === _name) === undefined)
        ]
    }

  case Actions.EDIT_CONTACT: {
    let { idx: _idx } = action;

    return {
      ...state,
      contacts: state.contacts.map((contact: Contact, idx: number) => {
        switch(true) {

        case contact.status === STATES.editing:
          return {
            ...contact,
            status: STATES.idle,
          };

        case idx === _idx:
          return {
            ...contact,
            status: STATES.editing,
          }

        default:
          return contact;
        }
      })
    }
  }

  case Actions.STOP_EDITING_CONTACT:

    return {
      ...state,
      contacts: state.contacts.map((contact: Contact) =>
        contact.status === STATES.editing
          ? {
            ...contact,
            status: STATES.idle
          } : contact
        )
    }

  default:
   return state;
  }
}

export default combineReducers({
  contactsReducer,
});
