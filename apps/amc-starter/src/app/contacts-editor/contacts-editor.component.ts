import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../models/contact';
import { Observable } from 'rxjs';
import { EventBusService } from '../event-bus.service';
import { ApplicationState } from '../state/app-state';
import { Store, select } from '@ngrx/store';
import { UpdateContactAction } from '../state/contacts/contacts.action';
import { map } from 'rxjs/operators';
import { ContactsQuery } from '../state/contacts/contacts-selectors';

@Component({
  selector: 'amc-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {

  public contact: Observable<Contact>;
  public warnOnClosing = true;

  constructor(
    private _router: Router,
    private _eventBusService: EventBusService,
    private _store: Store<ApplicationState>) { }

  ngOnInit() {
    this.contact = this._store.pipe(
      select(ContactsQuery.getSelectedContact),
      map(contact => ({ ...contact })));

    this._eventBusService.emit('appTitleChange', 'Editing contact');
  }

  cancel(contact: Contact) {
    this.goToDetails(contact);
  }

  save(contact: Contact) {
    this._store.dispatch(new UpdateContactAction(contact)); 
    
    this.goToDetails(contact);
  }

  private goToDetails(contact: Contact) {
    this._router.navigate(['/contact', contact.id]);
    this.warnOnClosing = false;
  }

}
