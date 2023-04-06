import {Injectable} from '@angular/core';
import {EventData} from './EventDataInterface';

@Injectable({
  providedIn: 'root',
})
/**
 * EventService
 */
export class EventService {
  events: EventData[] = [
    {
      id: Math.floor(Math.random() * 100),
      title: 'Event',
      description: 'This is the first event',
      date: '2020-01-01',
      image: 'https://picsum.photos/1200/600',
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
   * @return {EventData[]} The events.
   */
  getEvents(): EventData[] {
    return this.events;
  }
}
