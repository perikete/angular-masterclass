import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ContactsQuery } from './state/contacts/contacts-selectors';
import { ApplicationState } from './state/app-state';
import { ContactsService } from './contacts.service';
import { LoadContactsAction, SelectContactAction, AddContactAction, UpdateContactSuccessAction } from './state/contacts/contacts.action';
import { Observable, of } from 'rxjs';
import { Contact } from './models/contact';
import { take, withLatestFrom, switchMap, tap, mergeMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class ContactsFacade {

  contacts$ = this.store.pipe(select(ContactsQuery.getContacts));
  selectedContact$ = this.store.pipe(select(ContactsQuery.getSelectedContact));
  loaded$ = this.store.pipe(select(ContactsQuery.getLoaded));

  constructor(
    private store: Store<ApplicationState>,    
    private contactsService: ContactsService
  ) {
  }

  loadContacts() {
    this.store.dispatch(new LoadContactsAction());
  }

  getContactById(contactId: number): Observable<Contact> {
    this.store.dispatch(new SelectContactAction(contactId));

    return this.loaded$.pipe(
      take(1),
      withLatestFrom(this.selectedContact$),
      switchMap(([loaded, selectedContact]) => {
        let addContactToList = (contact: Contact) => {
          if (!selectedContact) {
            this.store.dispatch(new AddContactAction(contact))
          }
        };

        let getContact = (id: number) => this.contactsService.getContact(id).pipe(
          tap(addContactToList)
        );

        return loaded ? of(null) : getContact(contactId);
      }),
      mergeMap(() => this.selectedContact$)
    );
  }

  updateContact(contact: Contact): Observable<boolean> {
    return this.contactsService.updateContact(contact).pipe(
      map(contact => {
        this.store.dispatch(new UpdateContactSuccessAction(contact));
        return true;
      }),
      catchError(() => of(false))
    );
  }
}
