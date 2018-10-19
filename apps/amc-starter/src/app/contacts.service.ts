import { Injectable } from '@angular/core';
import { Contact } from './models/contact';
import { HttpClient } from '@angular/common/http';
import { ContactsResponse, ContactReponse, EmailCheckResponse } from './contact.responses';
import { map, delay, takeUntil, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';

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

  public isEmailAvailable(email: string) : any {
    return this._http.get(`${API_ENDPOINT}/check-email?email=${email}`);      
  }

  public search(terms: Observable<string>, debounceMs = 400): Observable<Contact[]> {
    const search = (term) => this._http.get<ContactsResponse>(`${API_ENDPOINT}/search?text=${term}`)
      .pipe(
        tap(term => console.log('search: term')),
        map(data => data.items));

    const allContacts$ = this.getContacts()
      .pipe(
        takeUntil(terms)
      );

    const contactsSearch$ = terms.pipe(
      debounceTime(debounceMs),
      distinctUntilChanged(),
      switchMap(term => search(term)));

    return merge(contactsSearch$, allContacts$);
  }

  public updateContact(contact: Contact): Observable<Contact> {
    return this._http.put<ContactReponse>(`${API_ENDPOINT}/contacts/${contact.id}`, contact)
      .pipe(map(data => data.item))
  }

  public addContact(contact: Contact): Observable<Contact> {
    return this._http.post<ContactReponse>(`${API_ENDPOINT}/contacts`, contact)
      .pipe(map(data => data.item))
  }
}

