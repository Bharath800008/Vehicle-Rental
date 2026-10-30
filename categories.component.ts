import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  template: `
    <h2>Vehicle Categories</h2>
    <p class="sub">Choose a category to see available vehicles.</p>
    <div class="grid">
      @for (c of categories; track c.name) {
        <a class="card cat" [routerLink]="['/vehicles']" [queryParams]="{ category: c.name }">
          <div class="icon">{{ c.icon }}</div>
          <h3>{{ c.name }}</h3>
          <p>{{ c.description }}</p>
          <p class="count">{{ service.countIn(c.name) }} vehicles</p>
        </a>
      }
    </div>
    <p class="center"><a class="btn" routerLink="/vehicles">View All Vehicles</a></p>
  `,
})
export class CategoriesComponent {
  service = inject(VehicleService);
  categories = this.service.getCategories();
}
