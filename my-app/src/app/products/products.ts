import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Productservice } from '../myservice/productservice';
import { Orderservice } from '../myservice/orderservice';
import { Categoryservice } from '../myservice/categoryservice';
import { Authservice } from '../myservice/authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  filteredProducts: any[] = [];
  loading = false;
  errorMessage = '';
  selectedCategory: string = '';
  searchMinPrice: number = 0;
  searchMaxPrice: number = 9999;
  selectedQuantities: { [key: string]: number } = {};
  isLoggedIn = false;
  currentUser: any = null;

  constructor(
    private productService: Productservice,
    private categoryService: Categoryservice,
    private orderService: Orderservice,
    private authService: Authservice,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
      this.cdr.detectChanges();
    });
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.errorMessage = 'Failed to load products';
        this.loading = false;
        this.cdr.detectChanges();
        console.error(error);
      }
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load categories', error);
      }
    });
  }

  searchByPrice() {
    if (this.searchMinPrice < 0 || this.searchMaxPrice < 0) {
      this.errorMessage = 'Price must be positive';
      return;
    }

    if (this.searchMinPrice > this.searchMaxPrice) {
      this.errorMessage = 'Min price cannot be greater than max price';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.productService.searchProductsByPrice(this.searchMinPrice, this.searchMaxPrice).subscribe({
      next: (data) => {
        this.filteredProducts = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.errorMessage = 'Search failed';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  filterByCategory(category_Id: string) {
  this.selectedCategory = category_Id;
  
  if (category_Id === '') {
    // Hiện tất cả
    this.filteredProducts = this.products;
  } else {
    // Filter thẳng ở frontend, không cần gọi API
    this.filteredProducts = this.products.filter(p => 
      p.category_Id === category_Id || 
      p.category_Id?.toString() === category_Id
    );
  }
  this.cdr.detectChanges();
}

  addToCart(product: any) {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    const quantity = this.selectedQuantities[product._id] || 1;
    if (quantity <= 0) {
      this.errorMessage = 'Please select a valid quantity';
      return;
    }

    this.orderService.addToCart(product, quantity);
    this.selectedQuantities[product._id] = 1;
    this.cdr.detectChanges();
    alert(`Added ${quantity} ${product.name} to cart!`);
  }

  getQuantity(productId: string): number {
    return this.selectedQuantities[productId] || 1;
  }

  setQuantity(productId: string, quantity: number) {
    if (quantity > 0) {
      this.selectedQuantities[productId] = quantity;
      this.cdr.detectChanges();
    }
  }
}