import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="container-custom">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <mat-card>
            <mat-card-header>
              <mat-card-title>
                <mat-icon>{{ isEditMode ? 'edit' : 'add' }}</mat-icon>
                {{ isEditMode ? 'Edit Product' : 'New Product' }}
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <form [formGroup]="productForm" (ngSubmit)="onSubmit()" class="mt-3">
                <div class="row">
                  <div class="col-md-6">
                    <mat-form-field class="full-width" appearance="outline">
                      <mat-label>Product Name</mat-label>
                      <input matInput formControlName="name" placeholder="Enter product name">
                      <mat-icon matPrefix>inventory_2</mat-icon>
                      @if (productForm.get('name')?.hasError('required') && productForm.get('name')?.touched) {
                        <mat-error>Product name is required</mat-error>
                      }
                    </mat-form-field>
                  </div>

                  <div class="col-md-6">
                    <mat-form-field class="full-width" appearance="outline">
                      <mat-label>Category</mat-label>
                      <input matInput formControlName="category" placeholder="Enter category">
                      <mat-icon matPrefix>category</mat-icon>
                      @if (productForm.get('category')?.hasError('required') && productForm.get('category')?.touched) {
                        <mat-error>Category is required</mat-error>
                      }
                    </mat-form-field>
                  </div>
                </div>

                <mat-form-field class="full-width" appearance="outline">
                  <mat-label>Description</mat-label>
                  <textarea matInput formControlName="description" rows="4" placeholder="Enter product description"></textarea>
                  <mat-icon matPrefix>description</mat-icon>
                </mat-form-field>

                <div class="photo-upload-section">
                  <label class="photo-label">
                    <mat-icon>photo_camera</mat-icon>
                    Product Photo
                  </label>
                  <input type="file" #fileInput (change)="onFileSelected($event)" accept="image/*" class="file-input">
                  <button mat-stroked-button type="button" (click)="fileInput.click()">
                    <mat-icon>upload</mat-icon>
                    Choose Photo
                  </button>
                  @if (selectedFileName) {
                    <span class="file-name">{{ selectedFileName }}</span>
                  }
                  @if (photoPreview) {
                    <div class="photo-preview">
                      <img [src]="photoPreview" alt="Preview">
                      <button mat-icon-button type="button" (click)="removePhoto()" class="remove-photo">
                        <mat-icon>close</mat-icon>
                      </button>
                    </div>
                  }
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <mat-form-field class="full-width" appearance="outline">
                      <mat-label>Price</mat-label>
                      <input matInput type="number" formControlName="price" placeholder="0.00" step="0.01">
                      <mat-icon matPrefix>attach_money</mat-icon>
                      @if (productForm.get('price')?.hasError('required') && productForm.get('price')?.touched) {
                        <mat-error>Price is required</mat-error>
                      }
                      @if (productForm.get('price')?.hasError('min')) {
                        <mat-error>Price must be greater than 0</mat-error>
                      }
                    </mat-form-field>
                  </div>

                  <div class="col-md-6">
                    <mat-form-field class="full-width" appearance="outline">
                      <mat-label>Quantity</mat-label>
                      <input matInput type="number" formControlName="quantity" placeholder="0">
                      <mat-icon matPrefix>numbers</mat-icon>
                      @if (productForm.get('quantity')?.hasError('required') && productForm.get('quantity')?.touched) {
                        <mat-error>Quantity is required</mat-error>
                      }
                      @if (productForm.get('quantity')?.hasError('min')) {
                        <mat-error>Quantity cannot be negative</mat-error>
                      }
                    </mat-form-field>
                  </div>
                </div>

                <div class="button-group">
                  <button mat-raised-button color="primary" type="submit" [disabled]="productForm.invalid">
                    <mat-icon>{{ isEditMode ? 'save' : 'add' }}</mat-icon>
                    {{ isEditMode ? 'Update' : 'Create' }} Product
                  </button>
                  <button mat-raised-button type="button" (click)="cancel()">
                    <mat-icon>cancel</mat-icon>
                    Cancel
                  </button>
                </div>
              </form>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    mat-card {
      margin-top: 20px;
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
    .button-group {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    .photo-upload-section {
      margin: 20px 0;
      padding: 20px;
      border: 2px dashed #ccc;
      border-radius: 8px;
      text-align: center;
    }
    .photo-label {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 15px;
      color: #666;
    }
    .file-input {
      display: none;
    }
    .file-name {
      display: block;
      margin-top: 10px;
      color: #666;
      font-size: 14px;
    }
    .photo-preview {
      margin-top: 20px;
      position: relative;
      display: inline-block;
    }
    .photo-preview img {
      max-width: 300px;
      max-height: 300px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .remove-photo {
      position: absolute;
      top: -10px;
      right: -10px;
      background: #f44336;
      color: white;
    }
  `]
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(0.01)]],
    quantity: [0, [Validators.required, Validators.min(0)]],
    category: ['', Validators.required]
  });

  isEditMode = false;
  productId?: number;
  selectedFile?: File;
  selectedFileName?: string;
  photoPreview?: string;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = +params['id'];
        this.loadProduct(this.productId);
      }
    });
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.productForm.patchValue(product);
        if (product.photoUrl) {
          this.photoPreview = this.productService.getPhotoUrl(product.photoUrl);
        }
      },
      error: (error) => {
        this.snackBar.open('Failed to load product', 'Close', { duration: 3000 });
        console.error('Error loading product:', error);
        this.router.navigate(['/products']);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoPreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  removePhoto(): void {
    this.selectedFile = undefined;
    this.selectedFileName = undefined;
    this.photoPreview = undefined;
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;

      const request = this.isEditMode
        ? this.productService.updateProduct(this.productId!, productData, this.selectedFile)
        : this.productService.createProduct(productData, this.selectedFile);

      request.subscribe({
        next: () => {
          this.snackBar.open(
            `Product ${this.isEditMode ? 'updated' : 'created'} successfully`,
            'Close',
            { duration: 3000 }
          );
          this.router.navigate(['/products']);
        },
        error: (error) => {
          this.snackBar.open(
            `Failed to ${this.isEditMode ? 'update' : 'create'} product`,
            'Close',
            { duration: 3000 }
          );
          console.error('Error saving product:', error);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
