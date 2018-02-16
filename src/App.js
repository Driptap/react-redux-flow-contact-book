// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import { STATES } from './reducer';
import type {
  Contact,
  EditContactAction,
  EditContactActionArgs,
  StopEditingContactAction,
  AddContactAction,
  RemoveContactAction,
  ChangeContactAction,
  ThunkAction,
  RemoveContactActionArgs,
  ChangeContactActionArgs,
} from './actions';

import {
  fetchContacts,
  addContact,
  changeContact,
  removeContact,
  editContact,
  stopEditingContact,
} from './actions';

import {
  EditContactCard,
  ContactCard,
} from './contact_cards';

class App extends Component <{
  contacts: Array<Contact>,
  status: number,
  fetchContacts: () => ThunkAction,
  addContact: () => AddContactAction,
  changeContact: ( args: ChangeContactActionArgs ) => ChangeContactAction,
  removeContact: ( args: RemoveContactActionArgs ) => RemoveContactAction,
  editContact: ( args: EditContactActionArgs ) => EditContactAction,
  stopEditingContact: () => StopEditingContactAction,
}> {

  componentWillMount() {
    this.props.fetchContacts();
  }

  render() {
    let {
      contacts,
      addContact,
      removeContact,
      changeContact,
      editContact,
      stopEditingContact,
    } = this.props;

    return (
      <div className="App">

        <header className="App-header">
          <h1>
            Contacts
          </h1>
        </header>

        <button onClick={ addContact }>
          Add Contact
        </button>

        { contacts.map((contact, idx) => contact.status === STATES.editing

          ? <EditContactCard
              contact={ contact }
              changeContact={ args => changeContact({ ...args, idx }) }
              removeContact={ () => removeContact({ idx })}
              stopEditingContact={ stopEditingContact } />

          : <ContactCard
              contact={ contact }
              editContact={() => editContact({ idx })} />

        )}

      </div>
    );
  }
}

const mapStateToProps = ({ contactsReducer: { contacts, status } }) => ({
  contacts,
  status,
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(fetchContacts()),
  addContact: () => dispatch(addContact()),
  changeContact: args => dispatch(changeContact(args)),
  removeContact: args => dispatch(removeContact(args)),
  editContact: args => dispatch(editContact(args)),
  stopEditingContact: () => dispatch(stopEditingContact()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
