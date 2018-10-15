import { Injectable } from '@angular/core';
import { CONTACT_DATA } from './data/contact-data';
import { Contact } from './models/contact';
import { HttpClient } from '@angular/common/http';
import { ContactsResponse, ContactReponse } from './contact.responses';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const API_ENDPOINT = 'http://localhost:4202/api';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private _http: HttpClient) { }

  public getContacts(): Observable<Contact[]> {
    return this._http.get<ContactsResponse>(`${API_ENDPOINT}/contacts`)
      .pipe(
        map(data => data.items));
  }

  public getContact(id: number): Observable<Contact> {
    return this._http.get<ContactReponse>(`${API_ENDPOINT}/contacts/${id}`)
      .pipe(map(data => data.item));
  }

  public updateContact(contact: Contact): Observable<Contact> {
    return this._http.put<ContactReponse>(`${API_ENDPOINT}/contacts/${contact.id}`, contact)
      .pipe(map(data => data.item))
  }
}
