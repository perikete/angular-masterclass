import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventBusService } from '../event-bus.service';
import { ApplicationState } from '../state/app-state';
import { Store, select } from '@ngrx/store';
import { ContactsQuery } from '../state/contacts/contacts-selectors';

@Component({
  selector: 'trm-contacts-detail-view',
  templateUrl: './contacts-detail-view.component.html',
  styleUrls: ['./contacts-detail-view.component.css']
})
export class ContactsDetailViewComponent implements OnInit {

  contact: Observable<Contact>;

  constructor(
    private _router: Router,
    private _eventBusService: EventBusService,
    private _store: Store<ApplicationState>) { }

  ngOnInit() {
    this.contact = this._store.pipe(select(ContactsQuery.getSelectedContact));  
    this._eventBusService.emit('appTitleChange', 'Viewing contact');
  }

  navigateToList() {
    this._router.navigate(['/']);
  }

  navigateToEdit(contact: Contact) {
    this._router.navigate(['/contact', contact.id, 'edit']);
  }
}
