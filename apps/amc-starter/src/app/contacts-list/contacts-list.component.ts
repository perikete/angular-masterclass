import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EventBusService } from '../event-bus.service';
import { ContactsFacade } from '../contacts-effects.service';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html'
})
export class ContactsListComponent implements OnInit {

  contacts$ = this._facade.contacts$;
  terms$ = new Subject<string>();

  constructor(
    private _eventBusService: EventBusService,
    private _facade: ContactsFacade) { }

  ngOnInit() {
    this._facade.loadContacts();
    this._eventBusService.emit('appTitleChange', 'Contacts');
  }
}
