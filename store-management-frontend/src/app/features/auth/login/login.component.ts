import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <mat-card>
            <mat-card-header>
              <mat-card-title>
                <mat-icon>login</mat-icon>
                Login
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="mt-3">
                <mat-form-field class="full-width" appearance="outline">
                  <mat-label>Email</mat-label>
                  <input matInput type="email" formControlName="email" placeholder="Enter your email">
                  <mat-icon matPrefix>email</mat-icon>
                  @if (loginForm.get('email')?.hasError('required') && loginForm.get('email')?.touched) {
                    <mat-error>Email is required</mat-error>
                  }
                  @if (loginForm.get('email')?.hasError('email')) {
                    <mat-error>Invalid email format</mat-error>
                  }
                </mat-form-field>

                <mat-form-field class="full-width" appearance="outline">
                  <mat-label>Password</mat-label>
                  <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" placeholder="Enter your password">
                  <mat-icon matPrefix>lock</mat-icon>
                  <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword">
                    <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                  </button>
                  @if (loginForm.get('password')?.hasError('required') && loginForm.get('password')?.touched) {
                    <mat-error>Password is required</mat-error>
                  }
                </mat-form-field>

                <button mat-raised-button color="primary" type="submit" class="full-width" [disabled]="loginForm.invalid">
                  <mat-icon>login</mat-icon>
                  Login
                </button>
              </form>

              <div class="mt-3 text-center">
                <p>Don't have an account? <a routerLink="/register">Register here</a></p>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    mat-card {
      max-width: 500px;
      margin: 0 auto;
    }
    mat-card-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 24px;
    }
    mat-form-field {
      margin-bottom: 15px;
    }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  hidePassword = true;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
          this.router.navigate(['/products']);
        },
        error: (error) => {
          this.snackBar.open('Login failed. Please check your credentials.', 'Close', { duration: 3000 });
          console.error('Login error:', error);
        }
      });
    }
  }
}
