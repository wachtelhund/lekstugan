import {Component, Input} from '@angular/core';
import {IEventData} from '../../../types/IEventData';
import {EventService} from 'src/app/services/event.service';
import {AuthService} from 'src/app/services/auth.service';

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
  isAdmin = false;

  /**
   * Constructor.
   */
  constructor(private eventService: EventService,
    private auth: AuthService) {}

  /**
    * On init.
    */
  ngOnInit(): void {
    if (this.auth.currentUser.value?.x_permission_level === 8) {
      this.isAdmin = true;
    }
  }

  /**
   * On delete.
   *
   * @param {IEventData} data The event data object.
   */
  onDelete(data: IEventData) {
    this.eventService.deleteEvent(data);
  }
}
