# Store Management Frontend

Modern Angular frontend application for the Store Management system.

## Tech Stack
- Angular 17+
- Angular Material
- Bootstrap 5
- RxJS
- TypeScript

## Prerequisites
- Node.js 18+ and npm
- Angular CLI: `npm install -g @angular/cli`

## Setup Instructions

1. **Install dependencies:**
   ```bash
   cd store-management-frontend
   npm install
   ```

2. **Run the development server:**
   ```bash
   ng serve
   ```

3. **Open in browser:**
   Navigate to `http://localhost:4200`

## Project Structure
```
src/
├── app/
│   ├── core/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── services/
│   ├── features/
│   │   ├── auth/
│   │   └── products/
│   ├── shared/
│   └── models/
```

## Features
- ✅ User Registration & Login
- ✅ JWT Authentication
- ✅ Product Listing (Public)
- ✅ Product CRUD (Authenticated)
- ✅ Responsive Design
- ✅ Material Design UI

## API Configuration
Backend API runs on: `http://localhost:8081`

## Build for Production
```bash
ng build --prod
```
