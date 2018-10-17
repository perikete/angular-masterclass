import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsDashhboardComponent } from './contacts-dashhboard.component';

describe('ContactsDashhboardComponent', () => {
  let component: ContactsDashhboardComponent;
  let fixture: ComponentFixture<ContactsDashhboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsDashhboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsDashhboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
