import { ApplicationState } from "./state/app-state";

export function selectContact() {
    return (state: ApplicationState) => {
        const id = state.contacts.selectedContactId;
        return state.contacts.list.find(c => c.id === id);
      } 
}