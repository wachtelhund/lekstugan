import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
})
/**
 * BookingFormComponent
 */
export class BookingFormComponent {
  bookingForm = new FormGroup({
    date: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    comment: new FormControl(''),
  });
  /**
   * Constructor.
   */
  constructor() {}

  /**
   * On submit booking.
   */
  onSubmitBooking() {
    if (this.bookingForm.invalid) {
      throw new Error('Invalid form');
    }
    console.log(this.bookingForm.value);
  }
}
