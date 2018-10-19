import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ContactsService } from './contacts.service';
import { SelectContactAction, AddContactAction, UpdateContactSuccessAction, LoadContactsAction, ContactActionTypes, LoadContactSuccessAction } from './state/contacts/contacts.action';
import { switchMap, map, take, withLatestFrom, mergeMap, tap, catchError } from 'rxjs/operators';
import { Contact } from './models/contact';
import { Observable, of } from 'rxjs';
import { ApplicationState } from './state/app-state';
import { Store, select } from '@ngrx/store';
import { ContactsQuery } from './state/contacts/contacts-selectors';

@Injectable()
export class ContactsFacade {

  contacts$ = this.store.pipe(select(ContactsQuery.getContacts));
  selectedContact$ = this.store.pipe(select(ContactsQuery.getSelectedContact));
  loaded$ = this.store.pipe(select(ContactsQuery.getLoaded));

  constructor(
    private store: Store<ApplicationState>,
    private actions$: Actions,
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

  @Effect() getContacts$ = this.actions$.pipe(
    ofType(ContactActionTypes.LOAD_CONTACTS),
    switchMap(() => this.contactsService.getContacts()),
    map((contacts: Contact[]) => new LoadContactSuccessAction(contacts))
  );

  /*@Effect() updateContact$ = this.actions$.pipe(
    ofType(ContactActionTypes.UPDATE_CONTACT),
    map((action: UpdateContactAction) => action.payload),
    concatMap((contact: Contact) => this.contactsService.updateContact(contact)),
    map((contact: Contact) => new UpdateContactSuccessAction(contact))
  );

  @Effect() searchContact$ = this.actions$.pipe(
    ofType(ContactActionTypes.SEARCH_CONTACT),
    switchMap((action: SearchContactsAction) => this.contactsService.search(action.payload)),
    switchMap((contacts: Contact[]) =>  [
       new SearchContactSuccessAction(contacts),
       new SelectContactAction(contacts ? +contacts[0].id : 0)
    ])
  ); */

}
