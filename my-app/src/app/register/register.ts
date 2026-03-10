import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authservice } from '../myservice/authservice';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  formData = {
    username: '',
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  };
  loading = false;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private authService: Authservice,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/shopping']);
    }
  }

  onRegister() {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.validateForm()) {
      return;
    }

    this.loading = true;
    const userData = {
      username: this.formData.username,
      email: this.formData.email,
      name: this.formData.name,
      password: this.formData.password,
      phone: this.formData.phone,
      address: this.formData.address,
      role: 'customer'
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = 'Registration successful! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
      }
    });
  }

  validateForm(): boolean {
    if (!this.formData.username || !this.formData.email || !this.formData.name || 
        !this.formData.password || !this.formData.confirmPassword) {
      this.errorMessage = 'Please fill in all required fields';
      return false;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return false;
    }

    if (this.formData.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return false;
    }

    return true;
  }
}
