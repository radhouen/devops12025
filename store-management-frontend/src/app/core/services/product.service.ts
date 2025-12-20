import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductRequest } from '../../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/products`;

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
  }

  createProduct(product: ProductRequest, photo?: File): Observable<Product> {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    if (photo) {
      formData.append('photo', photo);
    }
    return this.http.post<Product>(this.apiUrl, formData);
  }

  updateProduct(id: number, product: ProductRequest, photo?: File): Observable<Product> {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    if (photo) {
      formData.append('photo', photo);
    }
    return this.http.put<Product>(`${this.apiUrl}/${id}`, formData);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPhotoUrl(photoUrl: string | undefined): string {
    if (!photoUrl) {
      return 'https://via.placeholder.com/300x200?text=No+Image';
    }
    return `${environment.apiUrl}/files/products/${photoUrl}`;
  }
}
