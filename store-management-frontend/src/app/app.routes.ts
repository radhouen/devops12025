import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/product-list/product-list.component').then(m => m.ProductListComponent)
  },
  {
    path: 'products/new',
    loadComponent: () => import('./features/products/product-form/product-form.component').then(m => m.ProductFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./features/products/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
  },
  {
    path: 'products/edit/:id',
    loadComponent: () => import('./features/products/product-form/product-form.component').then(m => m.ProductFormComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/products'
  }
];
