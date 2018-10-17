import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Observable } from 'rxjs';
import { EventBusService } from '../event-bus.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'trm-contacts-detail-view',
  templateUrl: './contacts-detail-view.component.html',
  styleUrls: ['./contacts-detail-view.component.css']
})
export class ContactsDetailViewComponent implements OnInit {

  contact: Observable<Contact>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _contactsService: ContactsService,
    private _eventBusService: EventBusService) { }

  ngOnInit() {
    this.contact = this._route.paramMap
      .pipe(
        switchMap(paramMap => this._contactsService.getContact(+paramMap.get('id'))));

    this._eventBusService.emit('appTitleChange', 'Viewing contact');
  }

  navigateToList() {
    this._router.navigate(['/']);
  }

  navigateToEdit(contact: Contact) {
    this._router.navigate(['/contact', contact.id, 'edit']);
  }
}
