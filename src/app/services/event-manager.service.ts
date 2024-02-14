import { EventEmitter, Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {
  searchEvent: EventEmitter<any> = new EventEmitter<any>;

  constructor() {

  }

  //emitSearchEvent(data: any): void {
  //  this.searchEvent.next(data);
  //}

  //// Method to subscribe to search events
  //onSearch(): Observable<any> {
  //  return this.searchEvent.asObservable();
  //}
}
