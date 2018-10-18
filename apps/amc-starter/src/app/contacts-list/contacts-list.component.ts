import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { Observable, Subject } from 'rxjs';
import { EventBusService } from '../event-bus.service';
import { ApplicationState } from '../state/app-state';
import { Store } from '@ngrx/store';
import { LoadContactSuccessAction, LoadContactsAction, SearchContactsAction } from '../state/contacts/contacts.action';
import { ContactsQuery } from '../state/contacts/contacts-selectors';
import { debounce, tap } from 'rxjs/operators';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html'
})
export class ContactsListComponent implements OnInit {

  contacts$: Observable<Contact[]>;
  terms$ = new Subject<string>();

  constructor(
    private _contactsService: ContactsService,
    private _eventBusService: EventBusService,
    private _store: Store<ApplicationState>) { }

  ngOnInit() {
    this.contacts$ = this._store.select(ContactsQuery.getContacts);

    this._store.dispatch(new LoadContactsAction());

    this._store.dispatch(new SearchContactsAction(this.terms$));

    /* this._contactsService.search(this.terms$).subscribe(contacts => {
   this._store.dispatch(new LoadContactSuccessAction(contacts));
 }); */

    this._eventBusService.emit('appTitleChange', 'Contacts');
  }
}
