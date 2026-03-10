import { Component, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authservice } from './myservice/authservice';
import { Orderservice } from './myservice/orderservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('my-app');
  currentUser: any = null;
  isLoggedIn = false;
  cartCount = 0;

  constructor(
    private authService: Authservice,
    private orderService: Orderservice,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
    });

    this.orderService.cart$.subscribe(cart => {
      this.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    });
  }

  logout() {
    this.authService.logout();
    this.orderService.clearCart();
    this.router.navigate(['/login']);
  }
}
