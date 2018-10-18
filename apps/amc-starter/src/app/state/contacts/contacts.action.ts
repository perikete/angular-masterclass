import { Action } from "@ngrx/store";
import { Contact } from "../../models/contact";

export enum ContactActionTypes {
    LOAD_CONTACTS_SUCCESS =  '[Contacts] Load contacts success',
    SELECT_CONTACTS_SUCCESS = '[Contacts] Select contact success',
    UPDATE_CONTACTS_SUCCESS = '[Contacts] Update contact success',
    ADD_CONTACT = '[Contacts] Add contact succes'
}

export class LoadContactSuccessAction implements Action {
    readonly type = ContactActionTypes.LOAD_CONTACTS_SUCCESS;

    constructor(readonly payload: Contact[]) {}    
}

export class SelectContactAction implements Action {
    readonly type = ContactActionTypes.SELECT_CONTACTS_SUCCESS;

    constructor(readonly payload: number) {}
}

export class UpdateContactAction implements Action {
    readonly type = ContactActionTypes.UPDATE_CONTACTS_SUCCESS;

    constructor(readonly payload: Contact) {}
}

export class AddContactAction implements Action {
    readonly type = ContactActionTypes.ADD_CONTACT;

    constructor(readonly payload: Contact) { }
}

export type ContactsActions = LoadContactSuccessAction 
| UpdateContactAction 
| SelectContactAction
| AddContactAction;