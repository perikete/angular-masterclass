import { Directive, forwardRef } from '@angular/core';
import { ContactsService } from './contacts.service';
import { FormControl, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

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

  private checkEmailAvailability(email?: string) {
    return !email ? of(null) : this._contactsService.isEmailAvailable(email)
      .pipe(map((res: any) => !res.error ? null : { emailTaken: true }));
  }

  validate(c: FormControl) {
    return this.checkEmailAvailability(c.value);
  }
}
