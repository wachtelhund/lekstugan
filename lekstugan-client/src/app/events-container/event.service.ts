import {Injectable} from '@angular/core';
import {IEventData} from './IEventData';

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
      date: '2020-01-01',
      image: 'https://picsum.photos/500/600',
      links: ['https://www.google.com', 'https://www.reddit.com'],
    },
    {
      id: Math.floor(Math.random() * 100),
      title: 'Event',
      description: 'This is the second event',
      date: '2020-01-01',
      image: 'https://picsum.photos/1200/600',
      links: ['https://www.google.com', 'https://www.reddit.com'],
    },
    {
      id: Math.floor(Math.random() * 100),
      title: 'Event',
      description: 'This is the third event',
      date: '2020-01-01',
      image: 'https://picsum.photos/1200/600',
      links: ['https://www.google.com', 'https://www.reddit.com'],
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
}
