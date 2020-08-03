import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  private subject = new Subject<any>();

  on(eventName: string, action: any): Subscription {
    return this.subject.pipe(
      filter((e: EmitEvent) => {
        return e.name === eventName;
      }),
      map((e: EmitEvent) => {
        return e.value;
      })
    ).subscribe(action);
  }

  emit(eventData: EmitEvent) {
    this.subject.next(eventData);
  }
}

export class EmitEvent {
  constructor(public name: any, public value?: any) { }
}