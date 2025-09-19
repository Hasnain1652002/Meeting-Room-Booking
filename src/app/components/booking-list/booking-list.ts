import { Component, effect } from '@angular/core';
import { BookingService } from '../../services/booking';
import { Booking } from '../../models/Booking';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule,NgIf], 
  templateUrl: './booking-list.html',
  styleUrls: ['./booking-list.scss']
})
export class BookingListComponent {
  bookings;
  roomStatus;
  currentMeeting;
  message;


  constructor(private bookingService: BookingService) {
    this.bookings = this.bookingService.bookings;
    this.roomStatus = this.bookingService.roomStatus;
    this.currentMeeting = this.bookingService.currentMeeting;
    this.message = this.bookingService.message;


    effect(() => {
      if (this.message()) {
        console.log('[BookingList] Message:', this.message());
      }
    });
  }

  ngOnInit() {
    // fetch from db.json when component loads
    this.bookingService.fetchBookings();
  }

  onStartMeeting(id: string) {
    try {
      this.bookingService.startMeeting(id);
    } catch (e) {
      console.error(e);
    }
  }

  onEndMeeting() {
    this.bookingService.endMeeting();
  }

  onCancelBooking(id: string) {
    this.bookingService.cancelBooking(id);
  }

  trackById(index: number, booking: Booking) {
    return booking.id;
  }
}
