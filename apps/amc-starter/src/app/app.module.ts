import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContactsMaterialModule } from './contacts-material.module';
import { RouterModule } from '@angular/router';
import { ContactsAppComponent } from './app.component';
import { ContactsNgRxModule } from './contacts-ngrx.module';
import { ContactsService } from './contacts.service';
import { APP_ROUTES } from './app.routes';
import { ContactsListComponent } from './contacts-list';
import { ContactsDetailsComponent } from './contacts-details/contacts-details.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactsEditorComponent } from './contacts-editor/contacts-editor.component';
import { ContactsCreatorComponent } from './contacts-creator/contacts-creator.component';
import { EmailValidatorDirective } from './email-validator.directive';
import { EmailAvailabilityValidatorDirective } from './email-availability-validator.directive';
import { AddressInputComponent } from './address-input/address-input.component';
import { ContactsDetailViewComponent } from './contacts-detail-view/contacts-detail-view.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab/tab.component';
import { ContactsDashhboardComponent } from './contacts-dashhboard/contacts-dashhboard.component';
import { AboutModule } from './about/about.module';

export function confirmNavigationGuard(component) {
  debugger;
  const question = 'Navigate away without saving?';
  return !component.warnOnClosing || window.confirm(question);
}

@NgModule({
  declarations: [
    ContactsAppComponent,
    ContactsListComponent,
    ContactsDetailsComponent,
    ContactsEditorComponent,
    ContactsCreatorComponent,
    EmailValidatorDirective,
    EmailAvailabilityValidatorDirective,
    AddressInputComponent,
    ContactsDetailViewComponent,
    TabsComponent,
    TabComponent,
    ContactsDashhboardComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    ContactsMaterialModule,
    ContactsNgRxModule,
    FlexLayoutModule,
    RouterModule.forRoot(APP_ROUTES),
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  bootstrap: [ContactsAppComponent],
  providers: [
    ContactsService,
    { provide: 'ConfirmNavigationGuard', useValue: confirmNavigationGuard }
  ]
})
export class ContactsModule { }
