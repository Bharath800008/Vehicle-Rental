import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header>
      <h1>🚗 RentRide</h1>
      @if (auth.currentUser()) {
        <nav>
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Categories</a>
          <a routerLink="/vehicles" routerLinkActive="active">Vehicles</a>
          <a routerLink="/bookings" routerLinkActive="active">My Bookings</a>
          <span class="user">👤 {{ auth.currentUser() }}</span>
          <button class="link" (click)="logout()">Logout</button>
        </nav>
      }
    </header>
    <main><router-outlet /></main>
  `,
})
export class App {
  auth = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
