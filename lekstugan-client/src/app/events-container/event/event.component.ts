import { Component } from '@angular/core';

export interface EventData {
  id: number;
  title: string;
  description: string;
  date: string;
  image?: string;
}
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
/**
 * EventComponent
 */
export class EventComponent {
  eventData: EventData = {
    id: Math.floor(Math.random() * 100),
    title: 'Event',
    description: 'This is the first event',
    date: '2020-01-01',
    image: 'https://picsum.photos/600/600',
  };

  constructor() { }

}
