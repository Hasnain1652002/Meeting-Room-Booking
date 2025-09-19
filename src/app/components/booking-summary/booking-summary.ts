import { Component } from '@angular/core';
import { BookingService } from '../../services/booking';
import { CommonModule, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-booking-summary',
  standalone: true,
  imports: [CommonModule, UpperCasePipe],
  templateUrl: './booking-summary.html',
  styleUrls: ['./booking-summary.scss']
})
export class BookingSummaryComponent {
  constructor(public bookingService: BookingService) {}
  
  ngOnInit() {
    // Ensure bookings are fetched on load
    this.bookingService.fetchBookings();
  }

  get totalBookings() {
    return this.bookingService.getTotalBookings();
  }

  get roomStatus() {
    return this.bookingService.roomStatus();
  }

  get currentMeeting() {
    return this.bookingService.currentMeeting();
  }

  // get nextAvailableSlot() {
  //   return this.bookingService.getNextAvailableSlot();
  // }
}
