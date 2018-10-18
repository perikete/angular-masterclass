import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ContactsService } from './contacts.service';
import { Router } from '@angular/router';
import { LoadContactsAction, LoadContactSuccessAction, UpdateContactAction, UpdateContactSuccessAction, ContactActionTypes, SearchContactsAction, SelectContactAction } from './state/contacts/contacts.action';
import { switchMap, map, concatMap, tap } from 'rxjs/operators';
import { Contact } from './models/contact';

@Injectable()
export class ContactsEffects {

  constructor(
    private actions$: Actions,
    private contactsService: ContactsService
  ) { }

  @Effect() getContacts$ = this.actions$.pipe(
    ofType(ContactActionTypes.LOAD_CONTACTS),
    switchMap(_ => this.contactsService.getContacts()),
    map((contacts: Contact[]) => new LoadContactSuccessAction(contacts))
  );

  @Effect() updateContact$ = this.actions$.pipe(
    ofType(ContactActionTypes.UPDATE_CONTACT),
    map((action: UpdateContactAction) => action.payload),
    concatMap((contact: Contact) => this.contactsService.updateContact(contact)),
    map((contact: Contact) => new UpdateContactSuccessAction(contact))
  );

  @Effect() searchContact$ = this.actions$.pipe(
    ofType(ContactActionTypes.SEARCH_CONTACT),
    switchMap((action: SearchContactsAction) => this.contactsService.search(action.payload)),
    switchMap((contacts: Contact[]) =>  [
       new LoadContactSuccessAction(contacts),
       new SelectContactAction(contacts ? +contacts[0].id : 0)
    ])
  );

}
