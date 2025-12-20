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
  selector: 'app-register',
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
                <mat-icon>person_add</mat-icon>
                Register
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="mt-3">
                <mat-form-field class="full-width" appearance="outline">
                  <mat-label>First Name</mat-label>
                  <input matInput formControlName="firstname" placeholder="Enter your first name">
                  <mat-icon matPrefix>person</mat-icon>
                  @if (registerForm.get('firstname')?.hasError('required') && registerForm.get('firstname')?.touched) {
                    <mat-error>First name is required</mat-error>
                  }
                </mat-form-field>

                <mat-form-field class="full-width" appearance="outline">
                  <mat-label>Last Name</mat-label>
                  <input matInput formControlName="lastname" placeholder="Enter your last name">
                  <mat-icon matPrefix>person</mat-icon>
                  @if (registerForm.get('lastname')?.hasError('required') && registerForm.get('lastname')?.touched) {
                    <mat-error>Last name is required</mat-error>
                  }
                </mat-form-field>

                <mat-form-field class="full-width" appearance="outline">
                  <mat-label>Email</mat-label>
                  <input matInput type="email" formControlName="email" placeholder="Enter your email">
                  <mat-icon matPrefix>email</mat-icon>
                  @if (registerForm.get('email')?.hasError('required') && registerForm.get('email')?.touched) {
                    <mat-error>Email is required</mat-error>
                  }
                  @if (registerForm.get('email')?.hasError('email')) {
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
                  @if (registerForm.get('password')?.hasError('required') && registerForm.get('password')?.touched) {
                    <mat-error>Password is required</mat-error>
                  }
                  @if (registerForm.get('password')?.hasError('minlength')) {
                    <mat-error>Password must be at least 8 characters</mat-error>
                  }
                </mat-form-field>

                <button mat-raised-button color="primary" type="submit" class="full-width" [disabled]="registerForm.invalid">
                  <mat-icon>person_add</mat-icon>
                  Register
                </button>
              </form>

              <div class="mt-3 text-center">
                <p>Already have an account? <a routerLink="/login">Login here</a></p>
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
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  hidePassword = true;

  registerForm: FormGroup = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.snackBar.open('Registration successful! Please login.', 'Close', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.snackBar.open('Registration failed. Please try again.', 'Close', { duration: 3000 });
          console.error('Registration error:', error);
        }
      });
    }
  }
}
