import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login.component';
import { CategoriesComponent } from './pages/categories.component';
import { VehicleListComponent } from './pages/vehicle-list.component';
import { BookingComponent } from './pages/booking.component';
import { MyBookingsComponent } from './pages/my-bookings.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: CategoriesComponent, canActivate: [authGuard] },
  { path: 'vehicles', component: VehicleListComponent, canActivate: [authGuard] },
  { path: 'book/:id', component: BookingComponent, canActivate: [authGuard] },
  { path: 'bookings', component: MyBookingsComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
