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
  bookedDate = new Date();
  bookingForm = new FormGroup({
    date: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    comment: new FormControl(''),
  });
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
    const booked = this.bookingService.getUnavailableDates();
    console.log('DATE: ', date, 'BOOKED: ', booked);
    const workingDate = date.getMonth() + 1 +
        '/' + date.getDate() +
        '/' + date.getFullYear();
    const bookedDates = booked.map((date) => {
      return date.getMonth() + 1 +
          '/' + date.getDate() +
          '/' + date.getFullYear();
    });

    return date >= currentDate && !bookedDates.includes(workingDate);
  };

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
      this.bookedDate = new Date(date);
      this.bookingForm.reset();
      this.booked = true;
      console.log(this.bookingService.getBookings());
    } catch (error) {
      this.invalid = true;
    }
  }
}
