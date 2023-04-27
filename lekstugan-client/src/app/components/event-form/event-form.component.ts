import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventService} from 'src/app/services/event.service';
import {IEventData} from '../../types/IEventData';
import {ImageHelper} from 'src/app/helpers/ImageHelper';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
/**
 * EventFormComponent.
 */
export class EventFormComponent {
  eventForm = new FormGroup({
    date: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    link: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''),
  });
  posted = false;
  invalid = false;
  imageConfirmation = '';

  /**
   * Constructor.
   */
  constructor(private eventService: EventService) {}

  /**
   * Date filter.
   * @param {Date} date - The date to filter.
   * @return {boolean} - True if date is valid.
   */
  dateFilter: (date: Date | null) => boolean = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return date >= currentDate;
  };

  /**
   * On image input.
   *
   * @param {Event} $event - The event.
   */
  async onImageInput($event: Event) {
    const target = $event.target as HTMLInputElement;
    const file = target.files?.item(0);
    if (!file) {
      throw new Error('No file');
    }
    const base64 = await ImageHelper.imageToBase64(file);
    const image = await ImageHelper.compressImage(base64, 900);
    this.eventForm.patchValue({image: image.compressedBase64});
    this.imageConfirmation = 'Image uploaded!';
    setTimeout(() => {
      this.imageConfirmation = '';
    }, 3000);
  }

  /**
   * onSubmitEvent.
   */
  onSubmitEvent() {
    if (this.eventForm.invalid) {
      throw new Error('Invalid form');
    }
    try {
      const {date, title, description, link} = this.eventForm.value;
      if (!date) {
        throw new Error('Invalid date');
      }
      this.eventService.postEvent({
        // id: Math.floor(Math.random() * 100),
        title,
        description,
        date: new Date(date),
        image: this.eventForm.value.image,
        link,
      } as IEventData);
      this.eventForm.reset();
      this.posted = true;
      setTimeout(() => {
        this.posted = false;
      }, 3000);
    } catch (error) {
      this.invalid = true;
    }
  }
}
