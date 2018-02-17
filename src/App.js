// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'opensans-npm-webfont';
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
}, {
  searchTerm: string,
}> {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  componentWillMount() {
    this.props.fetchContacts();
  }

  render() {

    let { searchTerm } = this.state;
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

          <div className="Search">
            Search:
              <input
                type="text"
                value={this.state.searchTerm}
                onChange={e => this.setState({
                  searchTerm: e.target.value,
                })} />
          </div>
        </header>

        <div className="contacts-container">

          { contacts
            .filter(contact => !searchTerm
              || contact.name && contact.name.toUpperCase().includes(
                  searchTerm.toUpperCase())
              || contact.number && contact.number.toUpperCase().includes(
                  searchTerm.toUpperCase())
              || contact.address && contact.address.toUpperCase().includes(
                  searchTerm.toUpperCase())
              )
            .map((contact, idx) => contact.status === STATES.editing

            ? <EditContactCard
                contact={ contact }
                changeContact={ args => changeContact({ ...args, idx }) }
                removeContact={ () => removeContact({ idx })}
                stopEditingContact={ stopEditingContact } />

            : <ContactCard
                contact={ contact }
                editContact={() => editContact({ idx })} />

          )}

          <button onClick={ addContact }>
            Add Contact
          </button>

        </div>

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
