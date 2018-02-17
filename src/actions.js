// @flow

export const URL = 'http://www.mocky.io/v2/581335f71000004204abaf83';

export type Contact = {|
  name?: string,
  phone_number?: string,
  address?: string,
  status?: number,
|};

export type RemoveContactAction = {
  type: 'REMOVE_CONTACT',
  idx: number,
};

export type RemoveContactActionArgs = {
  idx: number,
};

export type FetchContactPendingAction = {
  type: 'FETCH_CONTACTS_PENDING',
};

export type FetchContactSuccessAction = {
  type: 'FETCH_CONTACTS_SUCCESS',
  json: Array<Contact>,
};

export type FetchContactFailedAction = {
  type: 'FETCH_CONTACTS_FAILED',
  error: string,
};

export type AddContactAction = {
  type: 'ADD_CONTACT',
};

export type ChangeContactAction = {
  type: 'CHANGE_CONTACT',
  contact: Contact,
  idx: number,
};

export type ChangeContactActionArgs = {
  contact: Contact,
  idx: number,
};

export type EditContactAction = {
  type: 'EDIT_CONTACT',
  idx: number,
};

export type EditContactActionArgs = {
  idx: number,
};

export type StopEditingContactAction = {
  type: 'STOP_EDITING_CONTACT',
};

export type ContactAction =
  | AddContactAction
  | RemoveContactAction
  | ChangeContactAction
  | FetchContactPendingAction
  | FetchContactSuccessAction
  | FetchContactFailedAction
  | EditContactAction
  | StopEditingContactAction;

type GetState = () => Object;
type PromiseAction = Promise<ContactAction>;
type Dispatch = (
  action: ContactAction
          | ThunkAction
          | PromiseAction
          | Array<ContactAction>) => any;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

export const EDIT_CONTACT = 'EDIT_CONTACT';
export const STOP_EDITING_CONTACT = 'STOP_EDITING_CONTACT';
export const ADD_CONTACT = 'ADD_CONTACT';
export const CHANGE_CONTACT = 'CHANGE_CONTACT';
export const REMOVE_CONTACT = 'REMOVE_CONTACT';
export const FETCH_CONTACTS_PENDING = 'FETCH_CONTACTS_PENDING';
export const FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS';
export const FETCH_CONTACTS_FAILED = 'FETCH_CONTACTS_FAILED';

const catchErrors = ( response: any ) => {
  if(response.ok === false || parseInt(response.status, 1) > 399)
    throw Error(JSON.parse(response.body).error)

  else return response;
}

export const fetchContacts = () : ThunkAction =>
  ( dispatch ) : PromiseAction => {
    dispatch({ type: FETCH_CONTACTS_PENDING });
    return fetch(URL)
      .then(res => catchErrors(res))
      .then(res => res.json())
      .then(({contacts: json}) =>
        dispatch({ type: FETCH_CONTACTS_SUCCESS, json  }))
      .catch(({ message: error }) =>
        dispatch({ type: FETCH_CONTACTS_FAILED, error }));
  };

export const addContact = () : AddContactAction => ({
  type: ADD_CONTACT,
});

export const changeContact = (
  args: ChangeContactActionArgs
) : ChangeContactAction => ({
  type: CHANGE_CONTACT,
  ...args,
});

export const removeContact = (
  args: RemoveContactActionArgs
) : RemoveContactAction => ({
  type: REMOVE_CONTACT,
  ...args,
});

export const editContact = (
  args: EditContactActionArgs
) : EditContactAction => ({
  type: EDIT_CONTACT,
  ...args
});

export const stopEditingContact = () : StopEditingContactAction => ({
  type: STOP_EDITING_CONTACT,
});
