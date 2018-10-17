import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface EventBusArgs {
  type: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  private _messages$ = new Subject<EventBusArgs>();

  constructor() { }

  emit(eventType: string, data: any) {
    const event = { type: eventType, data: data};
    this._messages$.next(event);
  }

  observe(eventType: string) : Observable<any> {
    return this._messages$.pipe(
      filter(e => e.type == eventType),
      map(e => e.data)
    );
  }
}
