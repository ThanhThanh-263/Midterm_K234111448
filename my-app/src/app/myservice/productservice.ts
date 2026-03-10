import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Productservice {
  private baseUrl = 'http://localhost:3002/api';

  constructor(private http: HttpClient) {}

  // GET /products
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

  // GET /products/:id
  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}`);
  }

  // GET /products?minPrice=&maxPrice=
  searchProductsByPrice(minPrice: number, maxPrice: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`, {
      params: { minPrice: minPrice.toString(), maxPrice: maxPrice.toString() }
    });
  }

  // GET /categories
  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  // GET /products?category=categoryId
  getProductsByCategory(categoryId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`, {
      params: { category: categoryId }
    });
  }

  // POST /products
  createProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, product);
  }

  // PUT /products/:id
  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/${id}`, product);
  }

  // DELETE /products/:id
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }
}