import { Action } from "@ngrx/store";
import { Contact } from "../../models/contact";
import { Observable } from "rxjs";

export enum ContactActionTypes {
    LOAD_CONTACTS_SUCCESS =  '[Contacts] Load contacts success',
    SELECT_CONTACTS_SUCCESS = '[Contacts] Select contact success',
    UPDATE_CONTACT = '[Contacts] Update contact',
    ADD_CONTACT = '[Contacts] Add contact success',
    LOAD_CONTACTS = '[Contacts] Load contact success',
    UPDATE_CONTACT_SUCCESS = '[Contacts] Update contact success',
    SEARCH_CONTACT = '[Contacts] Search contact'
}


export class SearchContactsAction implements Action {
    readonly type = ContactActionTypes.SEARCH_CONTACT;

    constructor(readonly payload: Observable<string>) {

    }
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
    readonly type = ContactActionTypes.UPDATE_CONTACT;

    constructor(readonly payload: Contact) {}
}

export class AddContactAction implements Action {
    readonly type = ContactActionTypes.ADD_CONTACT;

    constructor(readonly payload: Contact) { }
}

export class LoadContactsAction implements Action {
    readonly type = ContactActionTypes.LOAD_CONTACTS;

    constructor() { }
}

export class UpdateContactSuccessAction implements Action {
    readonly type = ContactActionTypes.UPDATE_CONTACT_SUCCESS;

    constructor(readonly payload: Contact) { }
}

export type ContactsActions = LoadContactSuccessAction 
| UpdateContactAction 
| SelectContactAction
| AddContactAction
| LoadContactsAction
| UpdateContactSuccessAction;