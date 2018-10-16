import { Directive } from '@angular/core';
import { FormControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';


const VALID_EMAIL = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

@Directive({
  selector: '[trmValidateEmail][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useValue: EmailValidatorDirective.validatEmail, multi: true }
  ]
})
export class EmailValidatorDirective {


  constructor() { }

  static validatEmail(c: FormControl) : ValidationErrors {
    return VALID_EMAIL.test(c.value) || c.value === '' ? null : {
      validateEmail: {
        valid: false
      }
    }
  }

}
