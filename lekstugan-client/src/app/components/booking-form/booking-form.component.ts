import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {BookingService} from '../../services/booking.service';
import {IBooking} from '../../types/IBooking';
import {firstValueFrom} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  bookings: IBooking[] = [];
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
  dateFilter = (date: Date | null): boolean => {
    // TODO: Make sure filtering works for already booked dates.
    if (!date) {
      return false;
    }
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (date < currentDate) {
      return false;
    }

    const dateString = date.toISOString().split('T')[0];
    const isBooked = this.bookings.some((booking) => {
      const bookedDate = new Date(booking.date).toISOString().split('T')[0];
      return bookedDate === dateString;
    });

    return !isBooked;
  };

  /**
   * Constructor.
   */
  constructor(private bookingService: BookingService,
    private snackBar: MatSnackBar) {}
  roll = false;

  /**
   * On init.
   */
  async ngOnInit() {
    this.bookings = await firstValueFrom(this.bookingService.getBookings());
  }

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
      if (comment?.trim().toLowerCase().replaceAll(' ', '') === 'barrelroll') {
        this.roll = true;
      }
      this.bookingService.postBooking({
        date: new Date(date),
        email,
        comment,
        association: 'spiik',
      } as IBooking);
      this.snackBar.openFromComponent(BookingConfirmDialog, {
        duration: 10000,
      });
      this.bookedDate = new Date(date);
      this.bookingForm.reset();
      this.booked = true;
      setTimeout(() => {
        this.booked = false;
      }, 10000);
    } catch (error) {
      this.invalid = true;
    }
  }
}
@Component({
  selector: 'booking-confirm-dialog',
  template: `
    <span class="booking-confirm">
      Your booking has been requested and will be reviewed shortly.
    <span>
  `,
})
/**
 * Post confirm dialog component.
 */
export class BookingConfirmDialog {}

