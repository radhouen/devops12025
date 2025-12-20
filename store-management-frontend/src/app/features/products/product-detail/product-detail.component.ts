import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="container-custom">
      @if (loading) {
        <div class="text-center mt-5">
          <mat-spinner></mat-spinner>
        </div>
      }

      @if (!loading && product) {
        <div class="row justify-content-center">
          <div class="col-md-10">
            <button mat-button routerLink="/products" class="back-button">
              <mat-icon>arrow_back</mat-icon>
              Back to Products
            </button>

            <mat-card class="product-detail-card">
              <div class="row">
                <div class="col-md-6">
                  @if (product.photoUrl) {
                    <img [src]="productService.getPhotoUrl(product.photoUrl)" 
                         [alt]="product.name" 
                         class="product-detail-image">
                  } @else {
                    <img src="https://via.placeholder.com/600x400?text=No+Image" 
                         [alt]="product.name" 
                         class="product-detail-image">
                  }
                </div>

                <div class="col-md-6">
                  <mat-card-header>
                    <mat-card-title>
                      <h1>{{ product.name }}</h1>
                    </mat-card-title>
                    <mat-card-subtitle>
                      <mat-chip class="category-chip">
                        <mat-icon>category</mat-icon>
                        {{ product.category }}
                      </mat-chip>
                    </mat-card-subtitle>
                  </mat-card-header>

                  <mat-card-content class="product-info">
                    <div class="price-section">
                      <div class="price-label">Price</div>
                      <div class="price-value">
                        <mat-icon>attach_money</mat-icon>
                        {{ product.price | number:'1.2-2' }}
                      </div>
                    </div>

                    <div class="quantity-section">
                      <div class="quantity-label">Availability</div>
                      <div class="quantity-value">
                        <mat-icon>inventory_2</mat-icon>
                        <span [class.in-stock]="product.quantity > 0" 
                              [class.out-of-stock]="product.quantity === 0">
                          {{ product.quantity > 0 ? product.quantity + ' in stock' : 'Out of stock' }}
                        </span>
                      </div>
                    </div>

                    @if (product.description) {
                      <div class="description-section">
                        <h3>Description</h3>
                        <p>{{ product.description }}</p>
                      </div>
                    }

                    <div class="meta-info">
                      @if (product.createdDate) {
                        <div class="meta-item">
                          <mat-icon>schedule</mat-icon>
                          <span>Added: {{ product.createdDate | date:'medium' }}</span>
                        </div>
                      }
                      @if (product.lastModifiedDate) {
                        <div class="meta-item">
                          <mat-icon>update</mat-icon>
                          <span>Updated: {{ product.lastModifiedDate | date:'medium' }}</span>
                        </div>
                      }
                    </div>
                  </mat-card-content>

                  <mat-card-actions class="action-buttons">
                    @if (authService.isAuthenticated()) {
                      <button mat-raised-button color="primary" (click)="editProduct()">
                        <mat-icon>edit</mat-icon>
                        Edit Product
                      </button>
                      <button mat-raised-button color="warn" (click)="deleteProduct()">
                        <mat-icon>delete</mat-icon>
                        Delete Product
                      </button>
                    }
                  </mat-card-actions>
                </div>
              </div>
            </mat-card>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .back-button {
      margin-bottom: 20px;
    }
    .product-detail-card {
      margin-top: 20px;
      padding: 30px;
    }
    .product-detail-image {
      width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    mat-card-header {
      margin-bottom: 30px;
    }
    h1 {
      font-size: 32px;
      margin: 0;
      color: #333;
    }
    .category-chip {
      font-size: 14px;
      margin-top: 10px;
    }
    .category-chip mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }
    .product-info {
      padding: 20px 0;
    }
    .price-section, .quantity-section {
      margin-bottom: 25px;
      padding-bottom: 25px;
      border-bottom: 1px solid #e0e0e0;
    }
    .price-label, .quantity-label {
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .price-value, .quantity-value {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 28px;
      font-weight: 600;
    }
    .price-value {
      color: #4caf50;
    }
    .quantity-value mat-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
    }
    .in-stock {
      color: #4caf50;
    }
    .out-of-stock {
      color: #f44336;
    }
    .description-section {
      margin: 30px 0;
    }
    .description-section h3 {
      font-size: 18px;
      margin-bottom: 15px;
      color: #333;
    }
    .description-section p {
      font-size: 16px;
      line-height: 1.6;
      color: #666;
    }
    .meta-info {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }
    .meta-item {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
      color: #666;
      font-size: 14px;
    }
    .meta-item mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }
    .action-buttons {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      display: flex;
      gap: 15px;
    }
    @media (max-width: 768px) {
      .product-detail-card {
        padding: 15px;
      }
      h1 {
        font-size: 24px;
      }
      .price-value, .quantity-value {
        font-size: 22px;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  productService = inject(ProductService);
  authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  product?: Product;
  loading = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(+id);
    }
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: (error) => {
        this.snackBar.open('Failed to load product', 'Close', { duration: 3000 });
        console.error('Error loading product:', error);
        this.loading = false;
        this.router.navigate(['/products']);
      }
    });
  }

  editProduct(): void {
    if (this.product?.id) {
      this.router.navigate(['/products/edit', this.product.id]);
    }
  }

  deleteProduct(): void {
    if (this.product?.id && confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.product.id).subscribe({
        next: () => {
          this.snackBar.open('Product deleted successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/products']);
        },
        error: (error) => {
          this.snackBar.open('Failed to delete product', 'Close', { duration: 3000 });
          console.error('Error deleting product:', error);
        }
      });
    }
  }
}
