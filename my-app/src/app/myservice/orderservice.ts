import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Orderservice {
  private apiUrl = 'http://localhost:3002/api';
  private cartSubject = new BehaviorSubject<any[]>(this.getLocalCart());
  public cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Local cart operations
  getCart(): any[] {
    return this.cartSubject.value;
  }

  addToCart(product: any, quantity: number): void {
    const cart = this.cartSubject.value;
    const existingItem = cart.find(item => item._id === product._id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    this.updateLocalCart(cart);
  }

  updateCartItem(productId: string, quantity: number): void {
    const cart = this.cartSubject.value;
    const item = cart.find(item => item._id === productId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.updateLocalCart(cart);
      }
    }
  }

  removeFromCart(productId: string): void {
    const cart = this.cartSubject.value.filter(item => item._id !== productId);
    this.updateLocalCart(cart);
  }

  clearCart(): void {
    this.updateLocalCart([]);
  }

  // Server operations
  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, orderData);
  }

  getOrdersByCustomer(customerId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders/customer/${customerId}`);
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/orders/${orderId}`, { status });
  }

  private updateLocalCart(cart: any[]): void {
    this.cartSubject.next(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  private getLocalCart(): any[] {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  }
}
