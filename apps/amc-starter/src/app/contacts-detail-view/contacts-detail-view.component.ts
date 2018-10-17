import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'trm-contacts-detail-view',
  templateUrl: './contacts-detail-view.component.html',
  styleUrls: ['./contacts-detail-view.component.css']
})
export class ContactsDetailViewComponent implements OnInit {

  contact: Observable<Contact>;

  constructor(private _route: ActivatedRoute, private _router: Router, private _contactsService: ContactsService) { }

  ngOnInit() {
    const id = this._route.snapshot.params['id'];
    this.contact = this._contactsService.getContact(id);
  }

  navigateToList() {
    this._router.navigate(['/']);
  }

  navigateToEdit(contact: Contact) {
    this._router.navigate(['/contact', contact.id, 'edit']);
  }
}
