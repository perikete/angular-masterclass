import { Component, OnInit } from '@angular/core';
import { GENDER } from '../data/gender';
import { COUNTRIES_DATA } from '../data/countries-data';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'amc-contacts-creator',
  templateUrl: './contacts-creator.component.html',
  styleUrls: ['./contacts-creator.component.css']
})
export class ContactsCreatorComponent implements OnInit {

  public genders = GENDER;
  public countries = COUNTRIES_DATA;
  
  constructor(private _contactsService: ContactsService, private _router: Router) { }

  ngOnInit() {
  }

  submit(contact: Contact) {  
    this._contactsService.addContact(contact).subscribe(() => this._router.navigate(['/']));
  }

}
