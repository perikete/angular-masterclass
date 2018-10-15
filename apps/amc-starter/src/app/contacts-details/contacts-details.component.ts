import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'amc-contacts-details',
  templateUrl: './contacts-details.component.html',
  styleUrls: ['./contacts-details.component.css']
})
export class ContactsDetailsComponent implements OnInit {

  public contact: Observable<Contact>;

  constructor(private _route: ActivatedRoute, private _contactsService: ContactsService) { }

  ngOnInit() {
    const id = this._route.snapshot.params['id'];
    this.contact = this._contactsService.getContact(id);    
  }

}
