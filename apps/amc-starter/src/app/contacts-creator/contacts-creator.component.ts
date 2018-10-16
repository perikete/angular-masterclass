import { Component, OnInit } from '@angular/core';
import { GENDER } from '../data/gender';
import { COUNTRIES_DATA } from '../data/countries-data';
import { Contact } from '../models/contact';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, EmailValidator, FormArray, FormControl } from '@angular/forms';
import { EmailValidatorDirective } from '../email-validator.directive';
import { EmailAvailabilityValidatorDirective, checkEmailAvailability } from '../email-availability-validator.directive';

@Component({
  selector: 'amc-contacts-creator',
  templateUrl: './contacts-creator.component.html',
  styleUrls: ['./contacts-creator.component.css']
})
export class ContactsCreatorComponent implements OnInit {

  public genders = GENDER;
  public countries = COUNTRIES_DATA;

  form: FormGroup = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', EmailValidatorDirective.validatEmail, checkEmailAvailability(this._contactsService)],
    gender: '',
    phone: this._formBuilder.array(['']),
    birthday: '',
    website: '',
    address: this._formBuilder.group({
      street: '',
      zip: '',
      city: '',
      country: ''
    })
  });


  constructor(
    private _contactsService: ContactsService,
    private _router: Router,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  submit(contact: Contact) {    
    this._contactsService.addContact(contact).subscribe(() => this._router.navigate(['/']));
  }

  addPhoneField() {
    const control = <FormArray>this.form.get('phone');
    control.push(new FormControl(''));
  }

  removePhoneField(index: number) {
    const control = <FormArray>this.form.get('phone');
    control.removeAt(index);
  }

}
