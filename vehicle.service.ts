import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Booking, Category, Vehicle } from '../models/vehicle';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private auth = inject(AuthService);
  private readonly KEY = 'rental_bookings';

  private categories: Category[] = [
    { name: 'Car', icon: '🚗', description: 'Comfortable sedans and hatchbacks' },
    { name: 'SUV', icon: '🚙', description: 'Spacious rides for family trips' },
    { name: 'Bike', icon: '🏍️', description: 'Bikes and scooters for city rides' },
    { name: 'Van', icon: '🚐', description: 'Vans and travellers for groups' },
  ];

  private vehicles: Vehicle[] = [
    { id: 1, name: 'Swift Dzire', category: 'Car', pricePerDay: 1800, seats: 5, fuel: 'Petrol', icon: '🚗' },
    { id: 2, name: 'Honda City', category: 'Car', pricePerDay: 2300, seats: 5, fuel: 'Petrol', icon: '🚘' },
    { id: 3, name: 'Hyundai Creta', category: 'SUV', pricePerDay: 2800, seats: 5, fuel: 'Diesel', icon: '🚙' },
    { id: 4, name: 'Mahindra Scorpio', category: 'SUV', pricePerDay: 3200, seats: 7, fuel: 'Diesel', icon: '🚙' },
    { id: 5, name: 'Royal Enfield 350', category: 'Bike', pricePerDay: 900, seats: 2, fuel: 'Petrol', icon: '🏍️' },
    { id: 6, name: 'Honda Activa', category: 'Bike', pricePerDay: 400, seats: 2, fuel: 'Petrol', icon: '🛵' },
    { id: 7, name: 'Tempo Traveller', category: 'Van', pricePerDay: 4500, seats: 12, fuel: 'Diesel', icon: '🚐' },
    { id: 8, name: 'Maruti Eeco', category: 'Van', pricePerDay: 2200, seats: 7, fuel: 'Petrol', icon: '🚐' },
  ];

  getCategories(): Category[] {
    return this.categories;
  }

  countIn(category: string): number {
    return this.vehicles.filter((v) => v.category === category).length;
  }

  getVehicles(category: string = 'All'): Vehicle[] {
    return category === 'All'
      ? this.vehicles
      : this.vehicles.filter((v) => v.category === category);
  }

  getVehicle(id: number): Vehicle | undefined {
    return this.vehicles.find((v) => v.id === id);
  }

  private readAll(): Booking[] {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) || '[]');
    } catch {
      return [];
    }
  }

  getMyBookings(): Booking[] {
    const me = this.auth.currentUser();
    return this.readAll().filter((b) => b.username === me);
  }

  addBooking(b: Omit<Booking, 'id' | 'username'>): void {
    const list = this.readAll();
    list.push({ ...b, id: Date.now(), username: this.auth.currentUser() ?? '' });
    localStorage.setItem(this.KEY, JSON.stringify(list));
  }

  cancelBooking(id: number): void {
    localStorage.setItem(
      this.KEY,
      JSON.stringify(this.readAll().filter((b) => b.id !== id))
    );
  }
}
