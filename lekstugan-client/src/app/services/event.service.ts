import {EventEmitter, Injectable} from '@angular/core';
import {IEventData} from '../types/IEventData';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
/**
 * EventService
 */
export class EventService {
  serverUrl = environment.apiURL;
  eventPosted: EventEmitter<IEventData> = new EventEmitter();
  eventDeleted: EventEmitter<IEventData> = new EventEmitter();

  /**
   * Constructor
   */
  constructor(private http: HttpClient) {}

  /**
   * Gets the events.
   *
   * @return {IEventData[]} The events.
   */
  getEvents(): Observable<IEventData[]> {
    return this.http.get<IEventData[]>(this.serverUrl + '/events');
  }

  /**
   * Posts an event.
   *
   * @param {IEventData} event The event to post.
   */
  postEvent(event: IEventData) {
    this.http
        .post(this.serverUrl + '/events', event)
        .subscribe((data) => {
          this.eventPosted.emit(data as IEventData);
        });
  }

  /**
   * Deletes an event.
   *
   * @param {IEventData} event The event to delete.
   */
  deleteEvent(event: IEventData) {
    this.http
        .delete(this.serverUrl + '/events/' + event.id)
        .subscribe(() => {
          this.eventDeleted.emit(event as IEventData);
        });
  }
}
