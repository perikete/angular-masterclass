import { TestBed } from '@angular/core/testing';

import { ContactsEffectsService } from './contacts-effects.service';

describe('ContactsEffectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactsEffectsService = TestBed.get(ContactsEffectsService);
    expect(service).toBeTruthy();
  });
});
