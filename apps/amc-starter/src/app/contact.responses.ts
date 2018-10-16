import { Contact } from "./models/contact";

export interface ContactsResponse {
    items: Contact[];
}

export interface ContactReponse {
    item: Contact;
}

export interface EmailCheckResponse {
    data: { msg: string } | { error: string };
}