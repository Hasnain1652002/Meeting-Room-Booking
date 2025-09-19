import { Injectable, signal, effect } from '@angular/core';
import { Booking } from '../models/Booking';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3000/bookings';

  bookings = signal<Booking[]>([]);
  roomStatus = signal<'free' | 'busy'>('free');
  currentMeeting = signal<Booking | null>(null);
  message = signal<string | null>(null);

  constructor(private http:HttpClient) {

    this.fetchBookings();

    // simple effect to log status changes
    effect(() => {
      const status = this.roomStatus();
      const meeting = this.currentMeeting();
      console.log('[BookingService] roomStatus:', status, meeting ? `active: ${meeting.name}` : '');
    });
  }

  fetchBookings() {
    this.http.get<Booking[]>(this.apiUrl).subscribe({
      next: (data) => this.bookings.set(data),
      error: (err) => {
        console.error('Failed to fetch bookings', err);
        this.message.set('Could not load bookings ❌');
      }
    });
  }

  isSlotAvailable(date: string, timeSlot: string): boolean {
    return !this.bookings().some(b => b.date === date && b.timeSlot === timeSlot);
  }

  addBooking(payload: { name: string; date: string; timeSlot: string }) {
    if (!this.isSlotAvailable(payload.date, payload.timeSlot)) {
      this.message.set('Selected slot is unavailable.');
      throw new Error('Slot unavailable');
    }
     const newBooking: Booking = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      name: payload.name,
      date: payload.date,
      timeSlot: payload.timeSlot,
      createdAt: new Date().toISOString()
    };

    this.http.post<Booking>(this.apiUrl, newBooking).subscribe({
      next: (saved) => {
        this.bookings.update(list => {
          const next = [...list, saved];
          next.sort((a, b) => a.date.localeCompare(b.date) || a.timeSlot.localeCompare(b.timeSlot));
          return next;
        });
        this.message.set('Booking added ✅');
        setTimeout(() => this.message.set(null), 2000);
      },
      error: (err) => {
        console.error('Error saving booking', err);
        this.message.set('Failed to save booking ❌');
      }
    });
  }

  cancelBooking(id: any) {
    if (this.currentMeeting() && this.currentMeeting()!.id === id) {
      this.endMeeting();
    }

    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.bookings.update(list => list.filter(b => b.id !== id));
        this.message.set('Booking cancelled.');
        setTimeout(() => this.message.set(null), 2000);
      },
      error: (err) => {
        console.error('Error deleting booking', err);
        this.message.set('Failed to cancel booking ❌');
        setTimeout(() => this.message.set(null), 2000);
      }
    });
  }

  startMeeting(id: string) {
    if (this.roomStatus() === 'busy') {
      this.message.set('Room is already busy.');
      throw new Error('Room busy');
    }
    const booking = this.bookings().find(b => b.id === id);
    if (!booking) {
      this.message.set('Booking not found.');
      return;
    }
    this.currentMeeting.set(booking);
    this.roomStatus.set('busy');
    this.message.set(`Meeting started: ${booking.name}`);
    setTimeout(() => this.message.set(null), 2000);
  }

  endMeeting() {
    if (this.roomStatus() === 'free') {
      this.message.set('Room already free.');
      return;
    }
    const ended = this.currentMeeting();
    this.currentMeeting.set(null);
    this.roomStatus.set('free');
    this.message.set(ended ? `Meeting ended: ${ended.name}` : 'Meeting ended.');
    setTimeout(() => this.message.set(null), 2000);
  }

  getTotalBookings() {
    return this.bookings().length;
  }

  // getNextAvailableSlot(): string {
  //   const first = this.bookings()[0];
  //   return first ? `${first.date} ${first.timeSlot}` : 'No bookings';
  // }
}
