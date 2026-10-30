export type CategoryName = 'Car' | 'SUV' | 'Bike' | 'Van';

export interface Category {
  name: CategoryName;
  icon: string;
  description: string;
}

export interface Vehicle {
  id: number;
  name: string;
  category: CategoryName;
  pricePerDay: number;
  seats: number;
  fuel: string;
  icon: string;
}

export interface Booking {
  id: number;
  username: string;
  vehicle: Vehicle;
  customer: string;
  phone: string;
  fromDate: string;
  toDate: string;
  days: number;
  total: number;
}
