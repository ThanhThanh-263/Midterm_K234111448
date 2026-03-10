import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authservice } from '../myservice/authservice';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  username = '';
  password = '';
  loading = false;
  submitted = false;
  errorMessage = '';

  constructor(
    private authService: Authservice,
    private router: Router
  ) {}

  ngOnInit() {
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/shopping']);
    }
  }

  onLogin() {
    this.submitted = true;
    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter username and password';
      return;
    }

    this.loading = true;
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.authService.setCurrentUser(response.user, response.token);
        this.router.navigate(['/shopping']);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
      }
    });
  }
}
