import {Component} from '@angular/core';
import {EventData} from './EventDataInterface';
import {EventService} from './event.service';

@Component({
  selector: 'app-events-container',
  templateUrl: './events-container.component.html',
  styleUrls: ['./events-container.component.scss'],
})
/**
 * EventsContainerComponent
 */
export class EventsContainerComponent {
  events: EventData[] = [];
  /**
   * Constructor.
   */
  constructor(private eventService: EventService) {
    this.events = this.eventService.getEvents();
  }
}
