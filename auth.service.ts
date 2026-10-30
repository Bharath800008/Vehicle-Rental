import { Injectable, signal } from '@angular/core';

interface DemoUser {
  username: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'rental_user';

  // Demo users (for model exam / learning purposes only)
  private users: DemoUser[] = [
    { username: 'user', password: 'user123' },
    { username: 'admin', password: 'admin123' },
  ];

  currentUser = signal<string | null>(this.read());

  private read(): string | null {
    try {
      return localStorage.getItem(this.KEY);
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  login(username: string, password: string): boolean {
    const found = this.users.find(
      (u) => u.username === username.trim() && u.password === password
    );
    if (!found) return false;
    localStorage.setItem(this.KEY, found.username);
    this.currentUser.set(found.username);
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.KEY);
    this.currentUser.set(null);
  }
}
