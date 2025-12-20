import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <span routerLink="/" style="cursor: pointer;">
        <mat-icon>store</mat-icon>
        Store Management
      </span>
      <span class="spacer"></span>
      <button mat-button routerLink="/products">
        <mat-icon>inventory</mat-icon>
        Products
      </button>
      @if (authService.isAuthenticated()) {
        <button mat-button routerLink="/products/new">
          <mat-icon>add</mat-icon>
          New Product
        </button>
        <button mat-button (click)="logout()">
          <mat-icon>logout</mat-icon>
          Logout
        </button>
      } @else {
        <button mat-button routerLink="/login">
          <mat-icon>login</mat-icon>
          Login
        </button>
        <button mat-button routerLink="/register">
          <mat-icon>person_add</mat-icon>
          Register
        </button>
      }
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    mat-toolbar {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    mat-icon {
      margin-right: 5px;
    }
  `]
})
export class NavbarComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.authService.logout();
  }
}
