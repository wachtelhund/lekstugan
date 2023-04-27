import {Component} from '@angular/core';
import {BookingService} from 'src/app/services/booking.service';
import {EventService} from 'src/app/services/event.service';
import {ImageService} from 'src/app/services/image.service';
import {IBase64Image} from 'src/app/types/IBase64Image';
import {IBooking} from 'src/app/types/IBooking';
import {IEventData} from 'src/app/types/IEventData';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
/**
 * The admin component.
 */
export class AdminComponent {
  pendingImages: IBase64Image[] = [];
  events: IEventData[] = [];
  pendingBookings: IBooking[] = [];
  pending = true;
  showEvents = false;
  showBookings = false;

  approvedBookings: IBooking[] = [];
  /**
   * Constructor.
   */
  constructor(private imageService: ImageService,
    private eventService: EventService,
    private bookingService: BookingService) {}

  /**
   * Fetches the pending images on init.
   */
  ngOnInit(): void {
    this.imageService.getPendingImages().subscribe((images) => {
      this.pendingImages.push(...images);
    });
    this.imageService.imageDeleted.subscribe((image) => {
      this.onImageDeleted(image);
    });
    this.imageService.imageAccepted.subscribe((image) => {
      this.onImageAccepted(image);
    });
    this.bookingService.getBookings().subscribe((bookings) => {
      bookings.forEach((booking) => {
        if (!booking.pending) {
          this.approvedBookings.push(booking);
        } else {
          this.pendingBookings.push(booking);
        }
      });
    });
    this.bookingService.bookingAccepted.subscribe((booking) => {
      this.onBookingAccepted(booking);
    });
    this.bookingService.bookingDeleted.subscribe((booking) => {
      this.onBookingDeleted(booking);
    });
  }

  /**
   * Shows the pending images and bookings.
   */
  onShowPending() {
    this.pending = true;
    this.showBookings = false;
    this.showEvents = false;
  }

  /**
   * Shows the approved bookings and upcoming events.
   */
  onShowEvents() {
    this.pending = false;
    this.showBookings = false;
    this.showEvents = true;
  }

  /**
   * Shows the bookings.
   */
  onShowBookings() {
    this.pending = false;
    this.showEvents = false;
    this.showBookings = true;
  }

  /**
   * On booking accepted.
   *
   * @param {IBooking} booking The booking that was accepted.
   */
  onBookingAccepted(booking: IBooking) {
    this.pendingBookings = this.pendingBookings.filter((b) => {
      return b.id !== booking.id;
    });
    this.approvedBookings.push(booking);
  }

  /**
   * On booking deleted.
   *
   * @param {IBooking} booking The booking that was deleted.
   */
  onBookingDeleted(booking: IBooking) {
    this.pendingBookings = this.pendingBookings.filter((b) => {
      return b.id !== booking.id;
    });
    this.approvedBookings = this.approvedBookings.filter((b) => {
      return b.id !== booking.id;
    });
  }

  /**
   * On image accepted.
   *
   * @param {IBase64Image} image The accepted image.
   */
  onImageAccepted(image: IBase64Image) {
    this.pendingImages = this.pendingImages.filter((i) => i.id !== image.id);
  }

  /**
   * Removes the image from the list of pending images.
   *
   * @param {IBase64Image} image The id of the image to remove.
   */
  onImageDeleted(image: IBase64Image) {
    this.pendingImages = this.pendingImages.filter((i) => i.id !== image.id);
  }
}
