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
import { ListKeyManager } from '@angular/cdk/a11y';
import {MatTreeModule} from '@angular/material/tree';
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
  templateUrl: "./product-list.component.html",
  styles: [`
  .example-card {
    max-width: 400px;
  }
  .title{
    color: #ff0808d9;
  }
  .card-header {
    border-bottom: 1px solid lightgray;
  }
  .example-header-image {
    background-image: url('/assets/images/chaise.webp');
    background-size: cover;
  }
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
      height: auto;
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
  public links = Array.from({ length: 10 }, (_, i) => ({
    label: `Link ${i + 1}`,
    url: `https://example.com/page${i + 1}`
  }));
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
