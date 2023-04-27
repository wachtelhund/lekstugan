import {Component, Input} from '@angular/core';
import {IEventData} from '../../../types/IEventData';
import {EventService} from 'src/app/services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
/**
 * EventComponent
 */
export class EventComponent {
  @Input() eventData!: IEventData;

  /**
   * Constructor.
   */
  constructor(private eventService: EventService) {}

  /**
   * On delete.
   *
   * @param {IEventData} data The event data object.
   */
  onDelete(data: IEventData) {
    this.eventService.deleteEvent(data);
  }
}
