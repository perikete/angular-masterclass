import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApplicationState } from './state/app-state';
import { Store, select } from '@ngrx/store';
import { ContactsService } from './contacts.service';
import { Contact } from './models/contact';
import { AddContactAction, SelectContactAction } from './state/contacts/contacts.action';
import { tap, map, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactExistsGuard implements CanActivate {

  constructor(
    private _contactsService: ContactsService, 
    private _store: Store<ApplicationState>) { }

  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      const contactId = +route.paramMap.get('id');

      const addContactToList = (contact: Contact) => this._store.dispatch(new AddContactAction(contact)); 

      const loadContactById = () => {
        return this._contactsService.getContact(contactId).pipe(
          tap(contact => addContactToList(contact)),
          map(contact => !!contact)
        )
      };

      this._store.dispatch(new SelectContactAction(contactId));
      const isLoadedQuery = (state: ApplicationState) => state.contacts.loaded; 

      return this._store.pipe(
        select(isLoadedQuery),
        take(1),
        switchMap(loaded => loaded ? of(true) : loadContactById())
      );
  }
}
