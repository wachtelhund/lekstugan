import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {BookingService} from '../../services/booking.service';
import {IBooking} from '../../types/IBooking';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IAssociation} from 'src/app/types/IAssociation';
import {AssociationService} from 'src/app/services/association.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
})
/**
 * BookingFormComponent
 */
export class BookingFormComponent {
  associations: IAssociation[] = [];
  booked = false;
  invalid = false;
  bookings: Date[] = [];
  bookedDate = new Date();
  bookingForm = new FormGroup({
    date: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    comment: new FormControl(''),
    name: new FormControl('', Validators.required),
    key: new FormControl('', Validators.required),
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
      return booking.toISOString().split('T')[0] === dateString;
    });

    return !isBooked;
  };

  /**
   * Constructor.
   */
  constructor(private bookingService: BookingService,
    private snackBar: MatSnackBar,
    private assosiciationService: AssociationService) {}
  roll = false;

  /**
   * On init.
   */
  async ngOnInit() {
    this.bookingService.getUnavailableDates().subscribe((dates) => {
      this.bookings = dates.map((date) => {
        return date;
      });
    });
    this.assosiciationService.getAssociations().subscribe((associations) => {
      this.associations = associations;
    });
  }

  /**
   * On submit booking.
   */
  onSubmitBooking() {
    if (this.bookingForm.invalid) {
      throw new Error('Invalid form');
    }
    try {
      const {date, email, comment, key, name} = this.bookingForm.value;

      if (!date) {
        throw new Error('Invalid date');
      }
      if (comment?.trim().toLowerCase().replaceAll(' ', '') === 'barrelroll') {
        this.roll = true;
      }
      if (!key) {
        throw new Error('Invalid key');
      }
      const association = {
        name: name?.trim().toLowerCase(),
        email: email?.trim().toLowerCase(),
        key: key.trim(),
      } as IAssociation;
      this.bookingService.postBooking({
        date: new Date(date),
        email: email?.trim().toLowerCase(),
        comment,
        association,
      } as IBooking).subscribe(() => {
        this.snackBar.openFromComponent(BookingConfirmDialog, {
          duration: 10000,
        });
        this.bookedDate = new Date(date);
        this.bookingForm.reset();
        this.booked = true;
        setTimeout(() => {
          this.booked = false;
        }, 10000);
      },
      (error) => {
        console.log(error);
        this.invalid = true;
      });
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

