import { Contact } from "../../models/contact";
import { ContactsActions, ContactActionTypes } from "./contacts.action";

export const FEATURE_KEY = 'contacts';

export interface ContactsState {
    entities: { [key: number]: Contact },
    selectedContactId: number,
    loaded: boolean
}

export const INITIAL_STATE: ContactsState = {
    entities: [],
    selectedContactId: 0,
    loaded: false
}

export function contactsReducer(state: ContactsState = INITIAL_STATE, action: ContactsActions) {

    switch (action.type) {

        case ContactActionTypes.LOAD_CONTACTS_SUCCESS:
            debugger;
            const contactList = action.payload.reduce(
                (entities, contact) => {
                    return { ...entities, [contact.id]: contact }
                },
                { ...state });            

            const ent = {
                ...state,
                entities: contactList,
                loaded: true
            };
            debugger;
            return ent;

        case ContactActionTypes.UPDATE_CONTACT_SUCCESS:
            return {
                ...state, entities: {
                    ...state.entities,
                    [action.payload.id]: action.payload
                }
            }

        case ContactActionTypes.SELECT_CONTACTS_SUCCESS:
            return { ...state, selectedContactId: action.payload }

        case ContactActionTypes.ADD_CONTACT:
            const inStore = state.entities[action.payload.id];

            return inStore ? state : {
                ...state, entities: {
                    ...state.entities,
                    [action.payload.id]: action.payload
                }
            }
        default: return state;
    }
}