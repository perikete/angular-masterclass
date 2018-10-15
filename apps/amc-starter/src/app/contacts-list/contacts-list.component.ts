import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html'
})
export class ContactsListComponent implements OnInit {

  contacts$: Observable<Contact[]>;

  constructor(private _contactsService: ContactsService) { }

  ngOnInit() {
    this.contacts$ = this._contactsService.getContacts();
  }

  public search(term: string) {
    this.contacts$ = this._contactsService.search(term);
  }
}
