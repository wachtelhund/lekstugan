import {Component, Input} from '@angular/core';
import {IEventData} from '../IEventData';

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
}
