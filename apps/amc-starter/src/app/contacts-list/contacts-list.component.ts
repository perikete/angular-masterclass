import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, delay, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html'
})
export class ContactsListComponent implements OnInit {

  contacts$: Observable<Contact[]>;
  terms$ = new Subject<string>();

  constructor(private _contactsService: ContactsService) { }

  ngOnInit() {

    const allContacts$ = this._contactsService.getContacts()
      .pipe(
        delay(5000),
        takeUntil(this.terms$));

    const contactsSearch$ = this.terms$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this._contactsService.search(term)));

    this.contacts$ = merge(contactsSearch$, allContacts$);
  }
}
