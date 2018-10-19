import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ContactsService } from './contacts.service';
import { UpdateContactSuccessAction, ContactActionTypes, LoadContactSuccessAction, UpdateContactAction } from './state/contacts/contacts.action';
import { switchMap, map, concatMap } from 'rxjs/operators';
import { Contact } from './models/contact';
import { ApplicationState } from './state/app-state';
import { Store, select } from '@ngrx/store';
import { ContactsQuery } from './state/contacts/contacts-selectors';

@Injectable()
export class ContactsEffects {

  contacts$ = this.store.pipe(select(ContactsQuery.getContacts));
  selectedContact$ = this.store.pipe(select(ContactsQuery.getSelectedContact));
  loaded$ = this.store.pipe(select(ContactsQuery.getLoaded));

  constructor(
    private store: Store<ApplicationState>,
    private actions$: Actions,
    private contactsService: ContactsService
  ) {
  }
 
  @Effect() getContacts$ = this.actions$.pipe(
    ofType(ContactActionTypes.LOAD_CONTACTS),
    switchMap(() => this.contactsService.getContacts()),
    map((contacts: Contact[]) => new LoadContactSuccessAction(contacts))
  );

  @Effect() updateContact$ = this.actions$.pipe(
    ofType(ContactActionTypes.UPDATE_CONTACT),
    map((action: UpdateContactAction) => action.payload),
    concatMap((contact: Contact) => this.contactsService.updateContact(contact)),
    map((contact: Contact) => new UpdateContactSuccessAction(contact))
  ); 

}
