// @flow
import React from 'react';

import type { Contact } from './actions';

export const ContactCard = ({
  editContact,
  contact: {
    name,
    phone_number,
    address,
    status,
  }
} : {
  editContact: () => any,
  contact: Contact,
}) =>
  <div className="Contact-card">
    <name>
      { name }
    </name>
    <number>
      Phone Number: { phone_number }
    </number>
    <address>
      Address:
      <br />
      { address &&
        address.split(',').map(line =>
          <span>
            { line }
            <br/>
          </span>
      )}
    </address>
    <button onClick={ editContact }>
      Edit Contact
    </button>
  </div>;

export const EditContactCard = ({
  contact: {
    name,
    phone_number,
    address,
    status,
  },
  changeContact,
  stopEditingContact,
  removeContact,
} : {
  contact: Contact,
  changeContact: ({ contact: Contact }) => any,
  removeContact: () => any,
  stopEditingContact: () => any,
}) =>
  <div className="Edit-contact-card">

    <label>
      Name
    </label>
    <input
      type="text"
      value={ name }
      onChange={ e => changeContact({
        contact: {
          name: e.target.value,
        }
      })} />

    <label>
      Phone Number
    </label>
    <input
      type="text"
      value={ phone_number }
      onChange={ e => changeContact({
        contact: {
          phone_number: e.target.value,
        }
      })} />

    <label>
      Address
    </label>
    <input
      type="text"
      value={ address }
      onChange={ e => changeContact({
        contact: {
          address: e.target.value,
        }
      })} />

    <button onClick={stopEditingContact} className="save">
      Save
    </button>
    <button onClick={removeContact} className="remove">
      Remove Contact
    </button>

  </div>;
