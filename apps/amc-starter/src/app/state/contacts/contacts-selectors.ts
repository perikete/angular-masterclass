import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ContactsState, FEATURE_KEY } from "./contacts.reducer";

export namespace ContactsQuery {
    export const getContactsState = createFeatureSelector<ContactsState>(FEATURE_KEY);

    export const getLoaded = createSelector(getContactsState, (state: ContactsState) => state.loaded);
    export const getContactEntities = createSelector(getContactsState, (state: ContactsState) => state.entities);
    export const getSelectedContactId = createSelector(getContactsState, (state: ContactsState) => state.selectedContactId);

    export const getContacts = createSelector(getContactEntities, (entities) => {
        const contacts = Object.keys(entities).map(id => entities[id]);        
        return contacts;
    });

    export const getSelectedContact = createSelector(getContactEntities, getSelectedContactId, (entities, id) => {
        return entities[id];
    });



}