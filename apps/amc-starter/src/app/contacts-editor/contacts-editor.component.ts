import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../models/contact';
import { Observable } from 'rxjs';
import { EventBusService } from '../event-bus.service';
import { map, filter, tap } from 'rxjs/operators';
import { ContactsFacade } from '../contacts-effects.service';

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
    private _facade: ContactsFacade) { }

  ngOnInit() {
    this.contact = this._facade.selectedContact$.pipe(
      map(contact => ({ ...contact }))
    );

    this._eventBusService.emit('appTitleChange', 'Editing contact');
  }

  cancel(contact: Contact) {
    this.goToDetails(contact);
  }

  save(contact: Contact) {
    this._facade.updateContact(contact)
    .subscribe(() =>  this.goToDetails(contact));
  }

  private goToDetails(contact: Contact) {
    this._router.navigate(['/contact', contact.id]);
    this.warnOnClosing = false;
  }

}
