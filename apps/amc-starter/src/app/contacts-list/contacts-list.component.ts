import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { Observable, Subject } from 'rxjs';
import { EventBusService } from '../event-bus.service';
import { ApplicationState } from '../state/app-state';
import { Store } from '@ngrx/store';
import { LoadContactSuccessAction } from '../state/contacts/contacts.action';

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
    const query = (state: ApplicationState) => state.contacts.list;
    this.contacts$ = this._store.select(query);

    this._contactsService.search(this.terms$).subscribe(contacts => {
      this._store.dispatch(new LoadContactSuccessAction(contacts));
    });

    this._eventBusService.emit('appTitleChange', 'Contacts');
  }
}
