import {Injectable} from '@angular/core';
import {IBooking} from '../components/booking-form/IBooking';

@Injectable({
  providedIn: 'root',
})
/**
 * BookingService
 */
export class BookingService {
  bookings: IBooking[] = [
    {
      date: new Date('2020-01-01'),
      email: 'asl;dkasd@alk;sdj.com',
      comment: 'asldkjasd',
      association: 'spiik',
    },
    {
      date: new Date('2020-01-02'),
      email: 'asl;dkasd@alk;sdj..se',
      comment: 'asldkjasdaslkdjasdlkjlaksdjlad',
      association: 'cnas',
    },
    {
      date: new Date('2020-01-03'),
      email: 'asl;dkasd@alk;sdj.com',
      comment: 'asldkjasd',
      association: 'lambda',
    },
  ];

  /**
   * Get bookings.
   *
   * @return {IBooking[]} - The bookings.
   */
  getBookings(): IBooking[] {
    return this.bookings;
  }

  /**
   * Post booking.
   *
   * @param {IBooking} booking - The booking to post.
   */
  postBooking(booking: IBooking): void {
    this.bookings.push(booking);
  }

  /**
   * Get unavailable dates.
   *
   * @return {Date[]} - The unavailable dates.
   */
  getUnavailableDates(): Date[] {
    return this.bookings.map((booking) => booking.date);
  }
}
