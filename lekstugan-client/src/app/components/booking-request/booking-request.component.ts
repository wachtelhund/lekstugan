import {Component, Input} from '@angular/core';
import {BookingService} from 'src/app/services/booking.service';
import {IBooking} from 'src/app/types/IBooking';

@Component({
  selector: 'app-booking-request',
  templateUrl: './booking-request.component.html',
  styleUrls: ['./booking-request.component.scss'],
})
/**
 * The booking request component.
 */
export class BookingRequestComponent {
  @Input() booking!: IBooking;

  /**
   * Constructor.
   */
  constructor(private bookingService: BookingService) {}

  /**
   * Deletes the booking.
   */
  onDelete() {
    this.bookingService.deleteBooking(this.booking as IBooking);
  }

  /**
   * Accepts the booking.
   */
  onAccept() {
    this.bookingService.acceptBooking(this.booking as IBooking);
  }
}
