import { Contact } from "../../models/contact";
import { ContactsActions, ContactActionTypes } from "./contacts.action";

export const FEATURE_KEY = 'contacts';

export interface ContactsState {
    list: Contact[],
    selectedContactId: number
}

export const INITIAL_STATE: ContactsState = {
    list: [],
    selectedContactId: 0
}

export function contactsReducer(state: ContactsState = INITIAL_STATE, action: ContactsActions) {
    
    switch(action.type) {
        
        case ContactActionTypes.LOAD_CONTACTS_SUCCESS:
            return {...state, list: action.payload }

        case ContactActionTypes.UPDATE_CONTACTS_SUCCESS:
            const isSame = (contact: Contact) => contact.id === action.payload.id;
            const updatedList = state.list.map(contact => isSame(contact) ? {...contact, ...action.payload} : contact);
            
            return {...state, list: updatedList};

        case ContactActionTypes.SELECT_CONTACTS_SUCCESS:
            return {...state, selectedContactId: action.payload }

        default: return state;
    }
}