import { Component, OnInit } from '@angular/core';
import { Orderservice } from '../myservice/orderservice';
import { Authservice } from '../myservice/authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cartItems: any[] = [];
  totalAmount = 0;
  loading = false;
  successMessage = '';
  errorMessage = '';
  currentUser: any = null;

  constructor(
    private orderService: Orderservice,
    private authService: Authservice,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.orderService.cart$.subscribe(cart => {
      this.cartItems = [...cart];
      this.calculateTotal();
    });
  }

  updateCartItem(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
    } else {
      this.orderService.updateCartItem(productId, quantity);
    }
  }

  removeFromCart(productId: string) {
    this.orderService.removeFromCart(productId);
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
  }

  addMoreProducts() {
    this.router.navigate(['/shopping']);
  }

  checkout() {
    if (this.cartItems.length === 0) {
      this.errorMessage = 'Cart is empty!';
      return;
    }

    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const orderData = {
      customer_id: this.currentUser._id,
      items: this.cartItems.map(item => ({
        product_id: item._id,
        quantity: item.quantity,
        price: item.price
      })),
      total_amount: this.totalAmount,
      status: 'paid',
      order_date: new Date().toISOString()
    };

    this.orderService.createOrder(orderData).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = '✓ Order placed successfully! Thank you for shopping.';
        this.orderService.clearCart();
        setTimeout(() => {
          this.router.navigate(['/shopping']);
        }, 2000);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Payment failed. Please try again.';
      }
    });
  }
}
