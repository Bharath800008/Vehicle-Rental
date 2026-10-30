import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-my-bookings',
  imports: [RouterLink],
  template: `
    <h2>My Bookings</h2>
    @for (b of bookings(); track b.id) {
      <div class="card wide">
        <h3>{{ b.vehicle.icon }} {{ b.vehicle.name }}</h3>
        <p>{{ b.customer }} · {{ b.phone }}</p>
        <p>{{ b.fromDate }} → {{ b.toDate }} ({{ b.days }} days)</p>
        <p class="price">Total: ₹{{ b.total }}</p>
        <button class="btn danger" (click)="cancel(b.id)">Cancel Booking</button>
      </div>
    } @empty {
      <p>No bookings yet. <a routerLink="/vehicles">Browse vehicles</a></p>
    }
  `,
})
export class MyBookingsComponent {
  private service = inject(VehicleService);
  bookings = signal(this.service.getMyBookings());

  cancel(id: number) {
    this.service.cancelBooking(id);
    this.bookings.set(this.service.getMyBookings());
  }
}
