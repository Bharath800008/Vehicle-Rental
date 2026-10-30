import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  template: `
    <div class="form-box login-box">
      <h2>🔐 Login</h2>
      <p class="hint">Demo: <b>user</b> / <b>user123</b> or <b>admin</b> / <b>admin123</b></p>

      <label for="u">Username</label>
      <input id="u" [(ngModel)]="username" placeholder="Enter username" />

      <label for="p">Password</label>
      <input id="p" type="password" [(ngModel)]="password" placeholder="Enter password"
             (keyup.enter)="submit()" />

      @if (error()) {
        <p class="error">{{ error() }}</p>
      }

      <button class="btn full" (click)="submit()">Login</button>
    </div>
  `,
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  error = signal('');

  submit() {
    if (!this.username.trim() || !this.password) {
      this.error.set('Please enter username and password.');
      return;
    }
    if (this.auth.login(this.username, this.password)) {
      this.router.navigate(['/']);
    } else {
      this.error.set('Invalid username or password.');
    }
  }
}
