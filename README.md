# Vehicle-Rental
# Vehicle Rental Progressive web application using (Angular + TypeScript)


Pages: Login -> Vehicle Categories -> Vehicle List (filter by category) -> Booking -> My Bookings

## Login (demo accounts)
- user / user123
- admin / admin123

## Run as an installable / offline PWA
The service worker only works in a production build:

## Project structure (src/app)
- models/vehicle.ts            Vehicle, Category, Booking interfaces
- services/auth.service.ts     login / logout (state saved in localStorage)
- services/vehicle.service.ts  categories, vehicles, bookings (localStorage)
- guards/auth.guard.ts         blocks pages until the user logs in
- pages/login.component.ts
- pages/categories.component.ts
- pages/vehicle-list.component.ts
- pages/booking.component.ts
- pages/my-bookings.component.ts
- app.ts / app.routes.ts / app.config.ts   root component, routes, service worker setup

PWA files: public/manifest.webmanifest, public/icons/, ngsw-config.json
