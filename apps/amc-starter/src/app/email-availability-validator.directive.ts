import { Directive, forwardRef } from '@angular/core';
import { ContactsService } from './contacts.service';
import { FormControl, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

export function checkEmailAvailability(contactsService: ContactsService) {
  return (c: FormControl) => !c.value ? of(null) : contactsService.isEmailAvailable(c.value)
    .pipe(map((res: any) => !res.error ? null : { emailTaken: true }));
}

@Directive({
  selector: '[trmCheckEmailAvailability]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => EmailAvailabilityValidatorDirective),
      multi: true
    }
  ]
})
export class EmailAvailabilityValidatorDirective {

  constructor(private _contactsService: ContactsService) { }
  

  validate(c: FormControl) {
    return checkEmailAvailability(this._contactsService)(c);
  }
}
