import {EventEmitter, Injectable} from '@angular/core';
import {IBooking} from '../types/IBooking';
import {HttpClient} from '@angular/common/http';
import {Observable, map} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * BookingService
 */
export class BookingService {
  bookingAccepted: EventEmitter<IBooking> = new EventEmitter();
  bookingDeleted: EventEmitter<IBooking> = new EventEmitter();
  serverUrl = 'http://localhost:5000/api/v1';
  bookings: IBooking[] = [];
  /**
   * Constructor.
   */
  constructor(private http: HttpClient) {}

  /**
   * Get bookings.
   *
   * @return {IBooking[]} - The bookings.
   */
  getBookings(): Observable<IBooking[]> {
    return this.http.get<IBooking[]>(this.serverUrl + '/bookings');
  }

  /**
   * Gets the pending bookings.
   *
   * @return {IBooking[]} The pending bookings.
   */
  getPendingBookings(): Observable<IBooking[]> {
    return this.getBookings().pipe(
        map((bookings) => {
          const pendingBookings: IBooking[] = [];
          bookings.forEach((booking) => {
            if (booking.pending) {
              pendingBookings.push(booking);
            }
          });
          return pendingBookings;
        })
    );
  }

  /**
   * Post booking.
   *
   * @param {IBooking} booking - The booking to post.
   */
  postBooking(booking: IBooking): void {
    this.http
        .post(this.serverUrl + '/bookings', booking)
        .subscribe((data) => {
          this.bookings.push(data as IBooking);
        });
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
    this.http.post(this.serverUrl +
      '/bookings/' +
      booking.id +
      '/accept', {booking})
        .subscribe((data) => {
          this.bookingAccepted.emit(data as IBooking);
        });
  }

  /**
   * Delete booking.
   *
   * @param {IBooking} booking - The booking to delete.
   */
  deleteBooking(booking: IBooking): void {
    this.http.delete(this.serverUrl + '/bookings/' + booking.id)
        .subscribe(() => {
          this.bookingDeleted.emit(booking);
        });
  }
}
