import {EventEmitter, Injectable} from '@angular/core';
import {IBooking} from '../types/IBooking';

@Injectable({
  providedIn: 'root',
})
/**
 * BookingService
 */
export class BookingService {
  bookingAccepted: EventEmitter<IBooking> = new EventEmitter();
  bookingDeleted: EventEmitter<IBooking> = new EventEmitter();
  bookings: IBooking[] = [
    {
      date: new Date('2020-01-01'),
      email: 'asl;dkasd@alk;sdj.com',
      comment: 'asldkjasd',
      association: 'spiik',
      // pending: true,
      id: '1',
    },
    {
      date: new Date('2020-01-02'),
      email: 'asl;dkasd@alk;sdj..se',
      comment: 'asldkjasdaslkdjasdlkjlaksdjlad',
      association: 'cnas',
      // pending: true,
      id: '2',
    },
    {
      date: new Date('2020-01-03'),
      email: 'asl;dkasd@alk;sdj.com',
      comment: 'asldkjasd',
      association: 'lambda',
      // pending: true,
      id: '3',
    },
    {
      date: new Date('2020-01-03'),
      email: 'asl;dkasd@alk;sdj.com',
      comment: 'lkjaflksdfdsk sdlkfj sdfklj sldkfdlsfksjdf sdlfkjsdfl sdflkj',
      association: 'lambda',
      pending: true,
      id: '4',
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
    booking.pending = true;
    booking.id = Math.random().toString(36).substr(2, 9);
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

  /**
   * Accept booking.
   *
   * @param {IBooking} booking - The booking to accept.
   */
  acceptBooking(booking: IBooking): void {
    booking.pending = false;
    this.bookingAccepted.emit(booking);
  }

  /**
   * Delete booking.
   *
   * @param {IBooking} booking - The booking to delete.
   */
  deleteBooking(booking: IBooking): void {
    const index = this.bookings.indexOf(booking);
    this.bookings.splice(index, 1);
    this.bookingDeleted.emit(booking);
  }
}
