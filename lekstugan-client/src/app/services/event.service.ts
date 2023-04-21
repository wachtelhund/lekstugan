import {Injectable} from '@angular/core';
import {IEventData} from '../types/IEventData';

@Injectable({
  providedIn: 'root',
})
/**
 * EventService
 */
export class EventService {
  events: IEventData[] = [
    {
      id: Math.floor(Math.random() * 100),
      title: 'Event',
      description: 'This is the first event',
      date: new Date('2020-01-01'),
      image: 'https://picsum.photos/500/600',
      link: 'https://www.google.com',
    },
    {
      id: Math.floor(Math.random() * 100),
      title: 'Event',
      description: 'This is the second event',
      date: new Date('2020-01-01'),
      image: 'https://picsum.photos/1200/600',
      link: 'https://www.google.com',
    },
    {
      id: Math.floor(Math.random() * 100),
      title: 'Event',
      description: 'This is the third event',
      date: new Date('2020-01-01'),
      image: 'https://picsum.photos/1200/600',
      link: 'https://www.google.com',
    },
  ];

  /**
   * Gets the events.
   *
   * @return {IEventData[]} The events.
   */
  getEvents(): IEventData[] {
    return this.events;
  }

  /**
   * Posts an event.
   *
   * @param {IEventData} event The event to post.
   */
  postEvent(event: IEventData) {
    this.events.push(event);
  }
}
