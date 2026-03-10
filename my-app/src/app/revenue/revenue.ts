import { Component, OnInit } from '@angular/core';
import { Revenueservice } from '../myservice/revenueservice';
import { Authservice } from '../myservice/authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-revenue',
  standalone: false,
  templateUrl: './revenue.html',
  styleUrl: './revenue.css',
})
export class Revenue implements OnInit {
  revenueData: any = null;
  revenueByYear: any[] = [];
  topCustomers: any[] = [];
  selectedYear: number = new Date().getFullYear();
  years: number[] = [];
  loading = false;
  errorMessage = '';
  chartData: any = null;
  currentUser: any = null;

  constructor(
    private revenueService: Revenueservice,
    private authService: Authservice,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user?.role !== 'employee') {
        this.router.navigate(['/shopping']);
      }
    });

    this.generateYears();
    this.loadRevenue();
  }

  generateYears() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i <= currentYear; i++) {
      this.years.push(i);
    }
  }

  loadRevenue() {
    this.loading = true;
    this.errorMessage = '';

    this.revenueService.getRevenueStats().subscribe({
      next: (response) => {
        this.revenueData = response;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load revenue data';
        this.loading = false;
      }
    });
  }

  loadRevenueByYear() {
    this.loading = true;
    this.revenueService.getRevenueByYear(this.selectedYear).subscribe({
      next: (response) => {
        this.revenueByYear = response;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load revenue by year';
        this.loading = false;
      }
    });
  }

  loadTopCustomers() {
    this.loading = true;
    this.revenueService.getTopCustomers(10).subscribe({
      next: (response) => {
        this.topCustomers = response;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load top customers';
        this.loading = false;
      }
    });
  }
}
