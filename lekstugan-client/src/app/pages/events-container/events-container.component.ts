import {Component, OnInit} from '@angular/core';
import {IEventData} from '../../types/IEventData';
import {EventService} from '../../services/event.service';

@Component({
  selector: 'app-events-container',
  templateUrl: './events-container.component.html',
  styleUrls: ['./events-container.component.scss'],
})
/**
 * EventsContainerComponent
 */
export class EventsContainerComponent implements OnInit {
  events: IEventData[] = [];
  /**
   * Constructor.
   */
  constructor(private eventService: EventService) {}

  /**
   * On init.
   */
  ngOnInit(): void {
    this.appendEvents();
    this.eventService.eventPosted.subscribe(() => {
      this.appendEvents();
    });
    this.eventService.eventDeleted.subscribe((event) => {
      this.events = this.events.filter((e) => e.id !== event.id);
    });
  }

  /**
   * Fetches and appends all events in order to the events array.
   */
  appendEvents() {
    this.eventService.getEvents().subscribe((events) => {
      this.events = events.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    });
  }
}
