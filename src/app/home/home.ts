// app/components/home/home.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingSummaryComponent } from '../components/booking-summary/booking-summary';
import { BookingListComponent } from '../components/booking-list/booking-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BookingSummaryComponent, BookingListComponent],
  template: `
    <div class="container">
      <app-booking-summary></app-booking-summary>
      <app-booking-list></app-booking-list>
    </div>
  `
})
export class HomeComponent {}
