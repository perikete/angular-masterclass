import { Contact } from "./models/contact";

export interface ContactsResponse {
    items: Contact[];
}

export interface ContactReponse {
    item: Contact;
}