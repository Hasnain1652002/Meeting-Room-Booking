import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../../services/booking';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  templateUrl: './booking-form.html',
  // styleUrls: ['./booking-form.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class BookingFormComponent {
  form: FormGroup;
  timeSlots = [
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00',
    '17:00-18:00',
  ];

  constructor(
    private fb: FormBuilder,
    public bookingService: BookingService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      timeSlot: [this.timeSlots[0], Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, date, timeSlot } = this.form.value;

    try {
      this.bookingService.addBooking({ name, date, timeSlot });

      // clear form
      this.form.reset({
        name: '',
        date: '',
        timeSlot: this.timeSlots[0],
      });
    } catch (err) {
      alert(this.bookingService.message() ?? (err as Error).message);
    }
  }

  isAvailable(): boolean {
    const date = this.form.get('date')?.value;
    const timeSlot = this.form.get('timeSlot')?.value;
    return !!date ? this.bookingService.isSlotAvailable(date, timeSlot) : true;
  }
}
