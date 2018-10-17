import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { Observable, Subject } from 'rxjs';
import { EventBusService } from '../event-bus.service';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html'
})
export class ContactsListComponent implements OnInit {

  contacts$: Observable<Contact[]>;
  terms$ = new Subject<string>();

  constructor(
    private _contactsService: ContactsService, 
    private _eventBusService: EventBusService) { }

  ngOnInit() {
    this.contacts$ = this._contactsService.search(this.terms$);
    this._eventBusService.emit('appTitleChange', 'Contacts');
  }
}
