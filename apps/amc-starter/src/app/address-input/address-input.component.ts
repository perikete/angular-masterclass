import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormBuilder, FormGroup, ControlValueAccessor } from '@angular/forms';
import { COUNTRIES_DATA } from '../data/countries-data';
import { Address } from 'cluster';

@Component({
  selector: 'trm-address-input',  
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressInputComponent),
      multi: true
    }
  ]
})
export class AddressInputComponent implements OnInit, ControlValueAccessor {

  countries = COUNTRIES_DATA;
  form: FormGroup;
  propagateChange = (_:Address) => {};
  propagateTouch = (_: any) => {};
  
  
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      street: '',
      zip: '',
      country: '',
      city: ''
    });

    this.form.valueChanges.subscribe(address => this.propagateChange(address));
  }

  writeValue(address: Address): void {
    this.form.setValue(address, { emitEvent: false});
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;    
  }
}
