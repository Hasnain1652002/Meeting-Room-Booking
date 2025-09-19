import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingFormComponent } from './components/booking-form/booking-form';
import { RouterLink, RouterLinkActive, RouterOutlet, Routes } from '@angular/router';
import { HomeComponent } from './home/home';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = 'Meeting Room Booking';
}

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },   //  home page
  { path: 'book-meeting', component: BookingFormComponent },
  { path: '**', redirectTo: '' },
];
