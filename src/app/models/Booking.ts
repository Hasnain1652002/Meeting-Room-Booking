export interface Booking {
  id: string;
  name: string;
  date: string;      // format: YYYY-MM-DD (from <input type="date">)
  timeSlot: string;  // e.g. "09:00-10:00"
  createdAt?: string;
}
