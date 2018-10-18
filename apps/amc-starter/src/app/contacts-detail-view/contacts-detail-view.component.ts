import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Observable } from 'rxjs';
import { EventBusService } from '../event-bus.service';
import { switchMap } from 'rxjs/operators';
import { ApplicationState } from '../state/app-state';
import { Store, select } from '@ngrx/store';
import { SelectContactAction } from '../state/contacts/contacts.action';
import { selectContact } from '../contact-selector.util';

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
    private _eventBusService: EventBusService,
    private _store: Store<ApplicationState>) { }

  ngOnInit() {

    this.contact = this._store.pipe(select(selectContact()));

    this._route.paramMap.subscribe(params => {
      this._store.dispatch(new SelectContactAction(+params.get('id')));
    });

    this._eventBusService.emit('appTitleChange', 'Viewing contact');
  }

  navigateToList() {
    this._router.navigate(['/']);
  }

  navigateToEdit(contact: Contact) {
    this._router.navigate(['/contact', contact.id, 'edit']);
  }
}
