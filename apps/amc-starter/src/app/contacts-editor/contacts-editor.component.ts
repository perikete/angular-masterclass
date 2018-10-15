import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../models/contact';
import { Observable } from 'rxjs';

@Component({
  selector: 'amc-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {

  public contact: Observable<Contact>;
  
  constructor(private _contactsService: ContactsService, private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    const id = this._activatedRoute.snapshot.params['id'];
    this.contact = this._contactsService.getContact(id);    
  }

  cancel(contact: Contact) {
    this.goToDetails(contact);
  }

  save(contact: Contact) {    
    this._contactsService.updateContact(contact)
    .subscribe(() => this.goToDetails(contact));
  }

  private goToDetails(contact: Contact) {
    this._router.navigate(['/contact', contact.id]);
  }

}
