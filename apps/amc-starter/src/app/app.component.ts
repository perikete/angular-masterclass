import { Component, OnInit } from '@angular/core';
import { EventBusService } from './event-bus.service';

@Component({
  selector: 'trm-contacts-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class ContactsAppComponent implements OnInit {
  title = 'Contacts';

  constructor(private _eventBusService: EventBusService) {
  }

  ngOnInit() {
    this._eventBusService.observe('appTitleChange')
      .subscribe(title => this.title = title);
  }

}
