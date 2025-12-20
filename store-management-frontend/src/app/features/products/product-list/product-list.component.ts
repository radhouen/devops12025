import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import { Product } from '../../../models/product.model';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <div class="container-custom">
      <div class="header-section">
        <h1>
          <mat-icon>inventory</mat-icon>
          Products
        </h1>
        @if (authService.isAuthenticated()) {
          <button mat-raised-button color="primary" (click)="navigateToNew()">
            <mat-icon>add</mat-icon>
            Add Product
          </button>
        }
      </div>

      <mat-form-field class="search-field" appearance="outline">
        <mat-label>Search products</mat-label>
        <input matInput [(ngModel)]="searchTerm" (ngModelChange)="filterProducts()" placeholder="Search by name or category">
        <mat-icon matPrefix>search</mat-icon>
      </mat-form-field>

      @if (loading) {
        <div class="text-center mt-5">
          <mat-spinner></mat-spinner>
        </div>
      }

      @if (!loading && filteredProducts.length === 0) {
        <mat-card class="empty-state">
          <mat-card-content>
            <mat-icon>inventory_2</mat-icon>
            <h2>No products found</h2>
            <p>There are no products available at the moment.</p>
            @if (authService.isAuthenticated()) {
              <button mat-raised-button color="primary" (click)="navigateToNew()">
                <mat-icon>add</mat-icon>
                Add Your First Product
              </button>
            }
          </mat-card-content>
        </mat-card>
      }

      <div class="row">
        @for (product of filteredProducts; track product.id) {
          <div class="col-md-4 mb-4">
            <mat-card class="product-card">
              @if (product.photoUrl) {
                <img mat-card-image [src]="productService.getPhotoUrl(product.photoUrl)" [alt]="product.name" class="product-image">
              } @else {
                <img mat-card-image src="https://via.placeholder.com/300x200?text=No+Image" [alt]="product.name" class="product-image">
              }
              <mat-card-header>
                <mat-card-title>{{ product.name }}</mat-card-title>
                <mat-card-subtitle>
                  <mat-chip class="category-chip">{{ product.category }}</mat-chip>
                </mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p class="description">{{ product.description }}</p>
                <div class="product-details">
                  <div class="price">
                    <mat-icon>attach_money</mat-icon>
                    <span>{{ product.price | number:'1.2-2' }}</span>
                  </div>
                  <div class="quantity">
                    <mat-icon>inventory_2</mat-icon>
                    <span>{{ product.quantity }} in stock</span>
                  </div>
                </div>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button color="accent" (click)="viewProduct(product.id!)">
                  <mat-icon>visibility</mat-icon>
                  View Details
                </button>
                @if (authService.isAuthenticated()) {
                  <button mat-button color="primary" (click)="editProduct(product.id!)">
                    <mat-icon>edit</mat-icon>
                    Edit
                  </button>
                  <button mat-button color="warn" (click)="deleteProduct(product.id!)">
                    <mat-icon>delete</mat-icon>
                    Delete
                  </button>
                }
              </mat-card-actions>
            </mat-card>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    h1 {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 0;
    }
    .search-field {
      width: 100%;
      max-width: 500px;
      margin-bottom: 20px;
    }
    .product-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    }
    .product-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .description {
      color: #666;
      margin: 15px 0;
      min-height: 60px;
    }
    .product-details {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #e0e0e0;
    }
    .price, .quantity {
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: 500;
    }
    .price {
      color: #4caf50;
      font-size: 18px;
    }
    .category-chip {
      font-size: 12px;
    }
    mat-card-actions {
      margin-top: auto;
      padding: 16px;
    }
    .empty-state {
      text-align: center;
      padding: 60px 20px;
    }
    .empty-state mat-icon {
      font-size: 80px;
      width: 80px;
      height: 80px;
      color: #ccc;
    }
    .empty-state h2 {
      margin-top: 20px;
      color: #666;
    }
  `]
})
export class ProductListComponent implements OnInit {
  productService = inject(ProductService);
  authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = false;
  searchTerm = '';

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.loading = false;
      },
      error: (error) => {
        this.snackBar.open('Failed to load products', 'Close', { duration: 3000 });
        this.loading = false;
        console.error('Error loading products:', error);
      }
    });
  }

  filterProducts(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
  }

  navigateToNew(): void {
    this.router.navigate(['/products/new']);
  }

  viewProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }

  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.snackBar.open('Product deleted successfully', 'Close', { duration: 3000 });
          this.loadProducts();
        },
        error: (error) => {
          this.snackBar.open('Failed to delete product', 'Close', { duration: 3000 });
          console.error('Error deleting product:', error);
        }
      });
    }
  }
}
