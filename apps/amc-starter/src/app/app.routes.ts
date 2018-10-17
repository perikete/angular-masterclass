import { Routes } from '@angular/router';
import { ContactsEditorComponent } from './contacts-editor/contacts-editor.component';
import { ContactsCreatorComponent } from './contacts-creator/contacts-creator.component';
import { ContactsDetailViewComponent } from './contacts-detail-view/contacts-detail-view.component';
import { ContactsDashhboardComponent } from './contacts-dashhboard/contacts-dashhboard.component';

export const APP_ROUTES: Routes = [
    {
        path: '', component: ContactsDashhboardComponent,
        children: [
            { path: '', redirectTo: 'contact/0', pathMatch: 'full' },
            { path: 'contact/new', component: ContactsCreatorComponent },
            { path: 'contact/:id', component: ContactsDetailViewComponent },
            { path: 'contact/:id/edit', component: ContactsEditorComponent, canDeactivate: ['ConfirmNavigationGuard'] },
        ]
    },
    {
        path: 'about', loadChildren: './about/about.module#AboutModule'
    },
    { path: '**', redirectTo: '' }


];