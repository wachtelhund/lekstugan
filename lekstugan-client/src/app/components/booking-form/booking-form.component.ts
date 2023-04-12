import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {BookingService} from '../../services/booking.service';
import {IBooking} from './IBooking';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
})
/**
 * BookingFormComponent
 */
export class BookingFormComponent {
  booked = false;
  invalid = false;
  bookingForm = new FormGroup({
    date: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    comment: new FormControl(''),
  });
  /**
   * Constructor.
   */
  constructor(private bookingService: BookingService) {}

  /**
   * On submit booking.
   */
  onSubmitBooking() {
    if (this.bookingForm.invalid) {
      throw new Error('Invalid form');
    }
    try {
      const {date, email, comment} = this.bookingForm.value;

      if (!date) {
        throw new Error('Invalid date');
      }

      this.bookingService.postBooking({
        date: new Date(date),
        email,
        comment,
        association: 'spiik',
      } as IBooking);

      this.bookingForm.reset();
      this.booked = true;
      console.log(this.bookingService.getBookings());
    } catch (error) {
      this.invalid = true;
    }
  }
}
