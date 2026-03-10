import { Component, OnInit } from '@angular/core';
import { Revenueservice } from '../myservice/revenueservice';
import { Authservice } from '../myservice/authservice';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-vip',
  standalone: false,
  templateUrl: './vip.html',
  styleUrl: './vip.css',
})
export class VIP implements OnInit {
  vipCustomers: any[] = [];
  topN: number = 10;
  loading = false;
  errorMessage = '';
  currentUser: any = null;

  constructor(
    private revenueService: Revenueservice,
    private authService: Authservice,
    private router: Router
  ) {}

  ngOnInit() {
    // take(1) — chỉ check 1 lần, không subscribe liên tục
    this.authService.currentUser$.pipe(take(1)).subscribe(user => {
      this.currentUser = user;
      if (user?.role !== 'employee') {
        this.router.navigate(['/shopping']);
        return;
      }
      // Chỉ load khi đúng là employee
      this.loadVIPCustomers();
    });
  }

  loadVIPCustomers() {
    this.loading = true;
    this.errorMessage = '';

    this.revenueService.getTopCustomers(this.topN).subscribe({
      next: (response) => {
        this.vipCustomers = response;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load VIP customers';
        this.loading = false;
      }
    });
  }

  updateVIPCount() {
    if (this.topN > 0) {
      this.loadVIPCustomers();
    }
  }
}