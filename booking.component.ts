import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../models/vehicle';

@Component({
  selector: 'app-booking',
  imports: [FormsModule, RouterLink],
  template: `
    @if (vehicle) {
      <div class="form-box">
        <h2>Book {{ vehicle.icon }} {{ vehicle.name }}</h2>
        <p>₹{{ vehicle.pricePerDay }} per day · {{ vehicle.category }}</p>

        <label for="c">Your Name</label>
        <input id="c" [(ngModel)]="customer" placeholder="Enter name" />

        <label for="ph">Phone</label>
        <input id="ph" [(ngModel)]="phone" placeholder="Enter phone number" />

        <label for="f">From Date</label>
        <input id="f" type="date" [(ngModel)]="fromDate" [min]="today" />

        <label for="t">To Date</label>
        <input id="t" type="date" [(ngModel)]="toDate" [min]="fromDate || today" />

        @if (days > 0) {
          <p class="total">{{ days }} day(s) → Total: ₹{{ total }}</p>
        }
        @if (error()) {
          <p class="error">{{ error() }}</p>
        }

        <button class="btn full" (click)="confirm()">Confirm Booking</button>
      </div>
    } @else {
      <p>Vehicle not found. <a routerLink="/vehicles">Back to vehicles</a></p>
    }
  `,
})
export class BookingComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(VehicleService);

  vehicle?: Vehicle = this.service.getVehicle(Number(this.route.snapshot.paramMap.get('id')));
  customer = '';
  phone = '';
  fromDate = '';
  toDate = '';
  error = signal('');
  today = new Date().toISOString().split('T')[0];

  get days(): number {
    if (!this.fromDate || !this.toDate) return 0;
    const diff = (new Date(this.toDate).getTime() - new Date(this.fromDate).getTime()) / 86400000;
    return diff >= 0 ? Math.round(diff) + 1 : 0;
  }

  get total(): number {
    return this.vehicle ? this.days * this.vehicle.pricePerDay : 0;
  }

  confirm() {
    if (!this.customer.trim() || !this.phone.trim() || this.days <= 0) {
      this.error.set('Please fill all fields with valid dates.');
      return;
    }
    this.service.addBooking({
      vehicle: this.vehicle!,
      customer: this.customer.trim(),
      phone: this.phone.trim(),
      fromDate: this.fromDate,
      toDate: this.toDate,
      days: this.days,
      total: this.total,
    });
    this.router.navigate(['/bookings']);
  }
}
