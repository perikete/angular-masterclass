import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../models/contact';
import { Observable } from 'rxjs';
import { EventBusService } from '../event-bus.service';
import { ApplicationState } from '../state/app-state';
import { Store, select } from '@ngrx/store';
import { selectContact } from '../contact-selector.util';
import { UpdateContactAction } from '../state/contacts/contacts.action';
import { map } from 'rxjs/operators';

@Component({
  selector: 'amc-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {

  public contact: Observable<Contact>;
  public warnOnClosing = true;

  constructor(
    private _contactsService: ContactsService,
    private _router: Router,
    private _eventBusService: EventBusService,
    private _store: Store<ApplicationState>) { }

  ngOnInit() {
    this.contact = this._store.pipe(
      select(selectContact()),
      map(contact => ({ ...contact })));
      
    this._eventBusService.emit('appTitleChange', 'Editing contact');
  }

  cancel(contact: Contact) {
    this.goToDetails(contact);
  }

  save(contact: Contact) {
    this._contactsService.updateContact(contact)
      .subscribe(() => {
        this._store.dispatch(new UpdateContactAction(contact));
        this.goToDetails(contact);
      });
  }

  private goToDetails(contact: Contact) {
    this._router.navigate(['/contact', contact.id]);
    this.warnOnClosing = false;
  }

}
