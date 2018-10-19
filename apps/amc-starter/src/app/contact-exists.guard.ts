import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContactsFacade } from './contacts-effects.service';

@Injectable({
  providedIn: 'root'
})
export class ContactExistsGuard implements CanActivate {

  constructor(
    private facade: ContactsFacade) { }

  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      const contactId = +route.paramMap.get('id');
      const contact$ = this.facade.getContactById(contactId);

      return contact$.pipe(map(contact => !!contact));
  }
}
