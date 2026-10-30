import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  imports: [RouterLink],
  template: `
    <h2>{{ selected() === 'All' ? 'All Vehicles' : selected() + ' Vehicles' }}</h2>

    <div class="filters">
      <a class="chip" [class.active]="selected() === 'All'" routerLink="/vehicles">All</a>
      @for (c of categories; track c.name) {
        <a class="chip" [class.active]="selected() === c.name"
           [routerLink]="['/vehicles']" [queryParams]="{ category: c.name }">
          {{ c.icon }} {{ c.name }}
        </a>
      }
    </div>

    <div class="grid">
      @for (v of vehicles(); track v.id) {
        <div class="card">
          <div class="icon">{{ v.icon }}</div>
          <h3>{{ v.name }}</h3>
          <p>{{ v.category }} · {{ v.seats }} seats · {{ v.fuel }}</p>
          <p class="price">₹{{ v.pricePerDay }} / day</p>
          <a class="btn" [routerLink]="['/book', v.id]">Book Now</a>
        </div>
      } @empty {
        <p>No vehicles found.</p>
      }
    </div>
  `,
})
export class VehicleListComponent {
  private service = inject(VehicleService);
  private route = inject(ActivatedRoute);

  categories = this.service.getCategories();

  selected = toSignal(
    this.route.queryParamMap.pipe(map((p) => p.get('category') ?? 'All')),
    { initialValue: 'All' }
  );

  vehicles = computed(() => this.service.getVehicles(this.selected()));
}
