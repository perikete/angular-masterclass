import { Action } from "@ngrx/store";
import { Contact } from "../../models/contact";

export enum ContactActionTypes {
    LOAD_CONTACTS_SUCCESS =  '[Contacts] Load contacts success'
}

export class LoadContactSuccessAction implements Action {
    readonly type = ContactActionTypes.LOAD_CONTACTS_SUCCESS;

    constructor(readonly payload: Contact[]) {
        
    }
    
}

export type ContactsActions = LoadContactSuccessAction;