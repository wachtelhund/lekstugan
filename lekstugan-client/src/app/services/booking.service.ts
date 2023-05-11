import {EventEmitter, Injectable} from '@angular/core';
import {IBooking} from '../types/IBooking';
import {HttpClient} from '@angular/common/http';
import {Observable, map} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
/**
 * BookingService
 */
export class BookingService {
  bookingAccepted: EventEmitter<IBooking> = new EventEmitter();
  bookingDeleted: EventEmitter<IBooking> = new EventEmitter();
  serverUrl = environment.apiURL;
  bookings: IBooking[] = [];
  /**
   * Constructor.
   */
  constructor(private http: HttpClient, private auth: AuthService) {}

  /**
   * Get bookings.
   *
   * @return {IBooking[]} - The bookings.
   */
  getBookings(): Observable<IBooking[]> {
    return this.http.get<IBooking[]>(this.serverUrl + '/bookings',
        // eslint-disable-next-line
        {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}});
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
      '/accept',
    {booking},
    // eslint-disable-next-line
    {headers: {'Authorization': 'Bearer ' + this.auth.token.value}})
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
    this.http.delete(this.serverUrl + '/bookings/' + booking.id,
        // eslint-disable-next-line
        {headers: {'Authorization': 'Bearer ' + this.auth.token.value}})
        .subscribe(() => {
          this.bookingDeleted.emit(booking);
        });
  }
}
