import { TestBed, async, inject } from '@angular/core/testing';

import { ContactExistsGuard } from './contact-exists.guard';

describe('ContactExistsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactExistsGuard]
    });
  });

  it('should ...', inject([ContactExistsGuard], (guard: ContactExistsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
