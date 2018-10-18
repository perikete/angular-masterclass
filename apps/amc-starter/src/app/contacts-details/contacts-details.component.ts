import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../models/contact';

@Component({
  selector: 'trm-contacts-details',
  templateUrl: './contacts-details.component.html',
  styleUrls: ['./contacts-details.component.css']
})
export class ContactsDetailsComponent implements OnInit {

  @Input() contact: Contact;
  @Output() edit = new EventEmitter<Contact>();
  @Output() back = new EventEmitter<void>();

  ngOnInit() { }

}
