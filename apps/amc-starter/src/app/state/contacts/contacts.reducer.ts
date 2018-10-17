import { Contact } from "../../models/contact";
import { ContactsActions, ContactActionTypes } from "./contacts.action";

export const FEATURE_KEY = 'contacts';

export interface ContactsState {
    list: Contact[]
}

export const INITIAL_STATE: ContactsState = {
    list: []
}

export function contactsReducer(state: ContactsState = INITIAL_STATE, action: ContactsActions) {
    
    switch(action.type) {
        case ContactActionTypes.LOAD_CONTACTS_SUCCESS:
            return {...state, list: action.payload }
        default: return state;
    }
}